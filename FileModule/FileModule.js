const fs = require('fs');

exports.download = (url, res) => {
    if (fs.existsSync(`./content${url}`)) {
        res.writeHead(200, { "Content-Type": "application/text" });
        fs.createReadStream(`content${url}`).pipe(res);
    }
    else {
        console.log("You don't have this file");
    }
}

exports.delete = (url) => {
    fs.stat(`content${url}`, function (err, stats) {
        if (err) {
            return console.error(err);
        }
        fs.unlink(`./content${url}`, function (err) {
            if (err) return console.log(err);
            console.log('File deleted successfully!');
        });
    });
}
