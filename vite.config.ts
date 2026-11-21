import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { youwareVitePlugin } from '@youware/vite-plugin-react';
import { defineConfig, type Plugin } from 'vite';

function waitlistApiPlugin(): Plugin {
  const filePath = path.resolve(process.cwd(), 'src/data/waitlist_users.json');

  return {
    name: 'waitlist-api',
    configureServer(server) {
      server.middlewares.use('/api/waitlist', (req, res, next) => {
        if (req.method === 'GET') {
          try {
            if (fs.existsSync(filePath)) {
              const data = fs.readFileSync(filePath, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(data);
              return;
            }
          } catch {
            /* ignore */
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify([]));
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const entry = JSON.parse(body);
              let entries: any[] = [];
              if (fs.existsSync(filePath)) {
                try {
                  entries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                } catch {
                  entries = [];
                }
              }
              const spotNumber = entries.length + 1;
              const newRecord = {
                id: `lead_${Date.now()}`,
                spotNumber,
                ...entry,
                createdAt: new Date().toISOString(),
              };
              entries.push(newRecord);
              fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  spotNumber,
                  count: entries.length,
                  record: newRecord,
                }),
              );
            } catch (err: any) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [youwareVitePlugin(), react(), waitlistApiPlugin()],
});
