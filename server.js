const express = require('express');
const http = require('http'); 
const favicon = require('serve-favicon');
const path = require('path');
const db = require('./app/DataBaseModule');
const view = require('./app/ViewModule');
const validation = require('./app/ValidationModule');
const encription = require('./app/EncriptionModule');
const session = require('cookie-session');


const app = express();

console.log(`Listen on 'localhost:3210'`);


app.use(session({
    name: 'session',
    keys: ['key1']
}))

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(express.static(__dirname + '/assets'))
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
    if (req.session.userId) {
        var profilePage = view.renderTemplate(
            './views/profile.pug',
            {
                user: 'some User'
            }
        );
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(profilePage);
    }
    else {
        res.redirect('/login');
    }
    
})

app.post('/login', function(req, res) {
    const email = req.body.login;
    const password  = req.body.pass;
    console.log('sms', email, password);


    db.getUser([email], (err, results, fields) => {
        let isError = false;

        if (err) {
            console.log(err);
        } 

        if (results.length === 0) {
            isError = true;
        }
        else {
            const user = results[0];
            console.log(user);
            console.log(encription.ecriptPassword(password))    
            if (encription.ecriptPassword(password) !== user.password) {
                isError = true;
            }
            else {
                
                req.session.userId = user.id;
                res.redirect('/profile');
            }
        }

        if (isError) {
            var loginPage = view.renderTemplate(
                './views/login.pug', 
                { error: 'Введен неправильный пароль или почта.' }
            );

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(loginPage);
        }

    });
});

app.post('/registration', (req, res) => {
    let email = req.body.login;
    let password = req.body.pass;
    const passwordConfirm = req.body.passConf;

    let errors = [];
    
    if (!validation.validateEmail(email)) {
        errors.push('Неправильный имейл.');
        email = '';
    }
    if (!validation.validatePassword(password)) {
        errors.push('Пароль должен содержать цифру и быть длиннее 4 символов.');
    }
    if (password !== passwordConfirm) {
        errors.push('Пароли не совпадают.')
    }

    if (errors.length != 0) {
        var registrationPage = view.renderTemplate(
            './views/registration.pug',
            {
                errors: errors.join('<br />'),
                email
            }
        )

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(registrationPage);
    }
    else {
        password = encription.ecriptPassword(password);

        db.setUser([email, password], (err, results, fields) => {
            console.log(err, results, fields);
        });

        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {

    delete req.session.userId;
    
    res.redirect('/login');

})


app.get('/api/add')


app.listen(3210);


