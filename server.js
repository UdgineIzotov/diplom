var express = require('express');
var http = require('http'); 
var favicon = require('serve-favicon');
var path = require('path');
var app = express();

var view = require('./app/ViewModule');

console.log(`Listen on 'localhost:3210'`);

app.use(favicon(path.join(__dirname, 'favicon.ico')));

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
    console.log("done");

    res.redirect('/profile');
});

app.post('/registration', function(req, res) {
    console.log('done');

    res.redirect('/profile');
});

app.use(express.static(__dirname + '/images'))


app.listen(3210);


