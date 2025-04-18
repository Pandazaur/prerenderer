var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import http from 'http';
import url from 'url';
import { prerender } from './prerender.js';
const server = http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/prerender') {
        try {
            const { url: queryUrl, filepath } = parsedUrl.query;
            if (typeof queryUrl !== 'string' || typeof filepath !== 'string') {
                throw new Error("url and filepath must be strings");
            }
            yield prerender(queryUrl, filepath);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Prerendered successfully');
        }
        catch (error) {
            console.error('Error during prerendering:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error during prerendering');
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}));
server.listen(3000, () => {
    console.log('Server listening on port 3000');
}).on('error', (err) => {
    console.error('HTTP server error:', err);
});
//# sourceMappingURL=index.js.map