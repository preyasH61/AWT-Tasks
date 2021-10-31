/*
download dependencies which is require and mention in package.json 
*/
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const exhbs = require('express-handlebars');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');

app.engine('hbs', exhbs({
    defaultLayout: 'index',
    extname: 'hbs',
    layoutsDir: `${__dirname}/views/layouts`
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'University'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});

app.get("/", (req, res) => {
    res.render("main");
});

//db-insert => Insert Record into studentInfo Table
app.post("/addinfo", (req, res) => {
    const dbInsert = "INSERT INTO Subjectinfo(sub_id,sub_name,inst_name,dept_name, sem) VALUES(?)";
    const value = [req.body.subcode, req.body.subname, req.body.inst, req.body.dept, req.body.sem]

    connection.query(dbInsert, [value], (err, result) => {
        if (err) throw err;
        console.log(`Total affected ROWS: ${result['affectedRows']}`)
        res.redirect('/');
    })

});
app.get("/display", (req, res) => {
    const dbSelect = `SELECT * FROM Subjectinfo`;
    connection.query(dbSelect, (err, detail) => {
        if (err) throw err;
        res.render("main", { detail });
        res.redirect('/');
    })
});

app.listen(4000, () => {
    console.log("Server is running on port number 4000")
})
