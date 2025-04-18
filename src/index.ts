import http from 'http';
import url from 'url';
import { prerender } from './prerender.js';

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url!, true);
  if (parsedUrl.pathname === '/prerender') {
    try {
      const { url: queryUrl, filepath } = parsedUrl.query;

      if (typeof queryUrl !== 'string' || typeof filepath !== 'string') {
        throw new Error("url and filepath must be strings");
      }

      await prerender(queryUrl, filepath);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Prerendered successfully');
    } catch (error) {
      console.error('Error during prerendering:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error during prerendering');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
}).on('error', (err) => {
  console.error('HTTP server error:', err);
});