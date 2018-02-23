const fs = require('fs');
const path = require('path');

var categories = ['JavaScript', "TypeScript", "Definition", "Configuration", "Images", "Logs", "Other"];

function fileList(dir) {
    return fs.readdirSync(dir).reduce(function (list, file) {
        var name = path.join(dir, file);
        var isDir = fs.statSync(name).isDirectory();

        return list.concat(isDir ? fileList(name) : [{
            name: file,
            path: name
        }]);
    }, []);
}

function sortFiles(files) {
    var sortedFiles = [];

    categories.forEach((category) => {
        sortedFiles[category] = {
            "category": category,
            files: []
        }
    });

    files.forEach((file) => {
        file.path = file.path.replace(/^content\\/i, '');
        file.path = file.path.replace(/\\/g, '/');

        if (file.path.match(/\.js$|\.jsx$/i)) {
            sortedFiles["JavaScript"].files.push(file);

            return;
        }

        if (file.path.match(/\.d\.ts$]/i)) {
            sortedFiles["Definition"].files.push(file);

            return;
        }

        if (file.path.match(/\.ts$|\.tsx$/i)) {
            sortedFiles["TypeScript"].files.push(file);

            return;
        }

        if (file.path.match(/\.json$|\.yaml$|\.yml$/i)) {
            sortedFiles["Configuration"].files.push(file);

            return;
        }

        if (file.path.match(/\.jpeg$|\.jpg$|\.png$|\.svg$|\.gif$/i)) {

            var scale = file.name.match(/x\d/g)
            if (scale) {
                file.scale = scale[scale.length - 1].match(/\d/);
            }

            sortedFiles["Images"].files.push(file);

            return;
        }
        if (file.path.match(/logs.*\.log$/i)) {

            var date = file.path.match(/\/[\d]{8}\//g)[0];
            var year = date.substr(1, 4);
            var month = date.substr(5, 2);

            file.date = { "year": year, "month": month };

            if (file.name.match(/stderr/i)) {
                file.type = 'stderr';
            }
            if (file.name.match(/stdout/i)) {
                file.type = 'srdout';
            }

            sortedFiles["Logs"].files.push(file);

            return;
        }

        sortedFiles["Other"].files.push(file);

    });

    return sortedFiles;
}

exports.categories = categories;
exports.sortFiles = sortFiles;
exports.fileList = fileList;

