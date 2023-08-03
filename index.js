const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 4000;

const MIME_TYPES = {
    // default: "application/octet-stream",
    html: "text/html; charset-UTF-8",
    js: "application/javascript",
    css: "text/css",
    png: "iamge/png",
    jpg: "image/jpg",
    jpeg: "image/jpeg"
};

const STATIC_PATH = path.join(process.cwd());

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
    const paths = [STATIC_PATH, url];
    if (url.endsWith("/")) paths.push("index.html");
    const filePath = path.join(...paths);
    const pathTraversal = !filePath.startsWith(STATIC_PATH);
    const exists = await fs.promises.access(filePath).then(...toBool);
    const found = !pathTraversal && exists;
    const streamPath = found ? filePath : STATIC_PATH + "/404.html"
    const ext = path.extname(streamPath).substring(1).toLowerCase();
    const stream = fs.createReadStream(streamPath);

    return {found, ext, stream};
};

http.createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    
    res.writeHead(statusCode, {"Content-Type": mimeType});
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
}).listen(port);

console.log(`http://localhost:${port}`);