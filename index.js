import { createServer } from 'node:http';

// initializes a simple http server
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/about') {
    res.end('About page\n');
    return;
  }

  if (req.url === '/contact') {
    res.end('Contact page\n');
    return;
  }

  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

