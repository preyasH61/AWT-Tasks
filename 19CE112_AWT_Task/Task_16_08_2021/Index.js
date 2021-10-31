/*
download dependencies which is require and mention in package.json 
*/
const express = require('express');
const PORT = 5000;
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/profile.html");
});

app.get('/displayprofile', (req, res) => {
    res.sendFile(__dirname+"/displayprofile.html");
});

app.post('/display', (req, res) => {
    res.redirect('displayprofile');});

app.post('/displayprofile', (req, res) => {

    res.render('displayprofile', {
        fname: req.body.fname,
        lname: req.body.lname,
        Email:  req.body.Email,
        mobile:req.body.mobile,
        dob: req.body.dob,
        gender: req.body.gender,
        addres: req.body.addres,
        inst: req.body.ins,
        dept: req.body.dept,
        sem: req.body.sem,
    });
});
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});
