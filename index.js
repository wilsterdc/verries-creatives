const http = require('http');
const fs = require('fs')
const port = 4000;

const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(data);
        return res.end();
    })
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});