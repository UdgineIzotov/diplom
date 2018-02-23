const http = require('http');

const CONTENT_DIR = 'content';

let allFiles = [];

const ViewModule = require('./ViewModule');
const DirModule = require('./DirModule');
const FileModule = require('./FileModule');

console.log(`Listen on "localhost:3210"`);

http.createServer(function (req, res) {
    console.dir(DirModule);

    if (req.url === '/' && req.method == 'GET') {
        allFiles = DirModule.fileList(CONTENT_DIR);
        var sortedFiles = DirModule.sortFiles(allFiles);

        var pageHtml = ViewModule.renderTemplate('./views/home.pug', {
            "sortedFiles": sortedFiles,
            "categories": DirModule.categories
        });

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(pageHtml);
    }
    if (req.url !== '/' && req.url !== '/favicon.ico' && req.method === 'GET') {
        FileModule.download(req.url, res);
    }
    if (req.url !== '/' && req.method === 'DELETE') {
        FileModule.delete(req.url);
    }
}).listen(3210);


