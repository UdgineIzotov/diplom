const mysql = require('mysql');
const queries = require('./queries');

const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'diplom'
});

const getUsers = (callback) => {
    connection.connect(connnectionCB);

    connection.query(queries.getUsers, callback);

    connection.end();
}

const setUser = (userData, callback) => {
    connection.connect(connnectionCB);
    console.log('working', userData)
    connection.query(queries.setUser, [userData], callback);

    connection.end();
}

const connnectionCB = (err) => {
    if(!err) {
        console.log("Database is connected...");    
    } else {
        console.log("Error connecting database...");    
    }
};

module.exports = {
    getUsers,
    setUser
}




