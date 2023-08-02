const http = require('http')
const fs = require('fs')
const path = require('path')
const port = 4000;

const server = http.createServer((req, res) => {
    const page = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
    const style = fs.readFileSync(path.resolve(__dirname, './style/index.css'), 'utf-8')
    
    console.log(req.url)
    // if (req.url === '/style/index.css') {
    //     fs.readFileSync(path.join(__dirname, './style/index.css'), (err, data) => {
    //         res.writeHead(200, {'content-type': 'text/css'})
    //         res.end(data)
    //     })
    // }

    res.writeHead(200, {'content-type': 'text/html'})
    res.write(style)
    res.end(page)
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});