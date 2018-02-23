const pug = require('pug');

exports.renderTemplate = (template, data) => pug.compileFile(template)(data);
