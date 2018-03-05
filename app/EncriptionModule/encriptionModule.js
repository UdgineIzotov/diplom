const crypto = require('crypto');

exports.ecriptPassword = password => crypto.createHmac('sha1', 'ururu').
                                            update(password).
                                            digest('hex');