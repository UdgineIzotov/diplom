const express = require('express');
const http = require('http'); 
const favicon = require('serve-favicon');
const path = require('path');
const db = require('./app/DataBaseModule');
const view = require('./app/ViewModule');

const app = express();

console.log(`Listen on 'localhost:3210'`);

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(express.static(__dirname + '/images'))
app.use(express.json());
app.use(express.urlencoded({     
    extended: true
  }));

app.get('/', function(req, res) {
    res.redirect('/home');
});

app.get('/home', function(req, res) {
    var homePage = view.renderTemplate('./views/home.pug')

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(homePage);
});

app.get('/login', function(req, res) {
    var loginPage = view.renderTemplate('./views/login.pug')

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(loginPage);
});

app.get('/registration', function(req, res) {
    var registrationPage = view.renderTemplate('./views/registration.pug')

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(registrationPage);
});

app.get('/profile', function(req, res) {
    var profilePage = view.renderTemplate(
        './views/profile.pug',
        {
            user: 'some User'
        }
    );    

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(profilePage);
})

app.post('/login', function(req, res) {

    const callback = (err, results, fields) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({err, result, fields}, null, 3));
    }

    const result  = db.getUsers(callback);    
});

app.post('/registration', (req, res) => {
    const login = req.body.login;
    const password = req.body.pass;

    db.setUser([[login, password]], (err, results, fields) => {
        console.log(err, results, fields);
    });

    res.redirect('/profile');
});
/*
{
   "login": "asdas@a",
   "pass": "asdsa",
   "passConf": "sadas"
}
*/


app.listen(3210);


