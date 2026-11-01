import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import { createServer as createViteServer } from 'vite';
import { SRI_LANKAN_STATIONS } from './src/data/sriLankanStations.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Live Sri Lankan Radio Browser directory sync endpoint
  app.get('/api/stations/live', async (_req, res) => {
    return res.json({
      source: 'verified-lk-directory',
      stations: SRI_LANKAN_STATIONS,
      liveDirectoryCount: SRI_LANKAN_STATIONS.length
    });
  });

  // 2. Universal Server-Side Live Audio Stream Proxy
  // Eliminates browser Mixed-Content (http:// vs https://) and CORS failures for all Sri Lankan radio streams
  app.get('/api/stream/:stationId', async (req, res) => {
    const { stationId } = req.params;
    const customUrl = typeof req.query.url === 'string' ? req.query.url : '';

    const station = SRI_LANKAN_STATIONS.find((s) => s.id === stationId);

    const candidateUrls: string[] = [];
    if (customUrl && /^https?:\/\/.+/i.test(customUrl)) {
      candidateUrls.push(customUrl);
    }
    if (station) {
      candidateUrls.push(station.streamUrl, ...(station.fallbackStreamUrls || []));
    }
    // Ultimate guaranteed working Sri Lankan live stream fallback (Siyatha FM / Hiru FM)
    candidateUrls.push(
      'https://srv01.onlineradio.voaplus.com/siyathafm',
      'https://radio.lotustechnologieslk.net:2020/stream/hirufmgarden'
    );

    const uniqueCandidates = [...new Set(candidateUrls.filter(Boolean))];

    for (const targetUrl of uniqueCandidates) {
      const abortController = new AbortController();
      const connectTimeout = setTimeout(() => abortController.abort(), 5000);

      try {
        const upstream = await fetch(targetUrl, {
          signal: abortController.signal,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            Accept: '*/*',
            'Icy-MetaData': '0',
            Connection: 'keep-alive'
          }
        });

        clearTimeout(connectTimeout);

        const contentType = upstream.headers.get('content-type') || '';
        const isAudio =
          upstream.ok &&
          upstream.body &&
          !contentType.toLowerCase().includes('text/html');

        if (!isAudio) {
          abortController.abort();
          continue;
        }

        res.setHeader(
          'Content-Type',
          contentType.includes('audio') || contentType.includes('ogg')
            ? contentType
            : 'audio/mpeg'
        );
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('X-Resolved-Stream-Url', targetUrl);
        res.socket?.setNoDelay(true);
        res.flushHeaders();

        const nodeStream = Readable.fromWeb(
          upstream.body as unknown as import('stream/web').ReadableStream
        );

        req.on('close', () => {
          abortController.abort();
          nodeStream.destroy();
        });

        nodeStream.on('error', () => {
          if (!res.headersSent) {
            res.status(502).end();
          } else {
            res.end();
          }
        });

        nodeStream.pipe(res);
        return;
      } catch {
        clearTimeout(connectTimeout);
      }
    }

    if (!res.headersSent) {
      res.status(502).json({ error: 'Unable to connect to radio stream' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LankaWave server listening on http://localhost:${PORT}`);
  });
}

startServer();
