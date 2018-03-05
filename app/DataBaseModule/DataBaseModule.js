const mysql = require('mysql');
const queries = require('./queries');

const connectionProps = {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'diplom'
}
const connection = mysql.createConnection(connectionProps);

const connnectionCB = (err) => {
    if(!err) {
        console.log("Database is connected...");    
    } else {
        console.log("Error connecting database...");    
    }
};

connection.connect( connnectionCB );

const getUsers = (callback) => {
    
    connection.query(queries.getUsers, (err, results, fields) => {
        callback(err, results, fields);
        connection.end();        
    });
}

const getUser = (userEmail, callback) => {
    connection.query(queries.getSingleUser, [[userEmail]] , (err, results, fields) => {
        if (err) {
            console.log(err)
        } else {
            callback(err, results, fields);
        }
    });    
}

const setUser = (userData, callback) => {
    connection.query(queries.setUser, [[userData]], callback);
}


module.exports = {
    getUsers,
    getUser,
    setUser
}




