/*
download dependencies which is require and mention in package.json 
*/
const express = require('express');
const app = express();
const exhbs = require('express-handlebars');

app.engine('hbs', exhbs({
    defaultLayout: 'index',
    extname: '.hbs',
    partialsDir: __dirname + '/layouts'
}));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('main', {
        footer: [
            {
                name: 'Preyash',
                id: '19CE112'
            }
        ],
        header: [
            {
                msg: 'Welcome'
            }
        ]
    });
});

app.listen(5000, () => {
    console.log('server runing');
})
