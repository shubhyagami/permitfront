const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const API_TARGET = 'http://13.234.78.55:8080';

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
};

const WWW = path.resolve(__dirname);

function safePath(p) {
    const full = path.resolve(WWW, p.replace(/^\/+/, ''));
    if (!full.startsWith(WWW)) return null;
    return full;
}

function serveStatic(req, res) {
    let filePath = safePath(req.pathname);
    if (!filePath) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }
    if (filePath.endsWith(path.sep)) filePath = path.join(filePath, 'index.html');

    const ext = path.extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            // SPA fallback - serve index.html for non-file routes
            fs.readFile(path.join(WWW, 'index.html'), (err2, indexData) => {
                if (err2) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Not found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(indexData);
            });
            return;
        }
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
    });
}

function proxyAPI(req, res) {
    const target = new URL(API_TARGET);
    const options = {
        hostname: target.hostname,
        port: target.port || 80,
        path: req.url,
        method: req.method,
        headers: {
            ...req.headers,
            host: target.hostname + (target.port ? ':' + target.port : ''),
        },
    };

    const proxyReq = http.request(options, (proxyRes) => {
        const headers = {
            ...proxyRes.headers,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };
        res.writeHead(proxyRes.statusCode, headers);
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (e) => {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Backend server unavailable at ' + API_TARGET,
            detail: e.message,
        }));
    });

    req.pipe(proxyReq);
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    req.pathname = url.pathname;

    // CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
        });
        res.end();
        return;
    }

    // Proxy API GET requests to the backend
    if (req.pathname.startsWith('/api/') || req.pathname === '/admin/stats') {
        proxyAPI(req, res);
        return;
    }

    // Proxy POST/PUT/DELETE requests (form submissions + API mutations)
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        proxyAPI(req, res);
        return;
    }

    // All other GET requests: serve static files (with SPA fallback)
    serveStatic(req, res);
});

server.listen(PORT, () => {
    console.log(`\n  \x1b[1mPermitIQ Frontend Server\x1b[0m`);
    console.log(`  \x1b[2m──────────────────────────────\x1b[0m`);
    console.log(`  \x1b[33mLocal\x1b[0m:  http://localhost:${PORT}`);
    console.log(`  \x1b[36mAPI \x1b[0m:  ${API_TARGET}`);
    console.log(`  \x1b[2m──────────────────────────────\x1b[0m`);
    console.log(`  Press Ctrl+C to stop\n`);
});
