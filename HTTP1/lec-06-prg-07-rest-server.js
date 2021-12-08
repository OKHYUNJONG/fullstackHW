const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const multer = require('multer');
const form_data = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(form_data.array());

var database = {};

app.put('/membership_api/:member_id', (req, res) => {
    const id = req.params.member_id;
    if (id in database){
        var temp = {};
        temp[id] = "None";
        res.send({temp})
    }
    else{
        database[id] = req.body[id]
        var temp = {};
        temp[id] = database[id];
        res.send({temp})
    }
})

app.get('/membership_api/:member_id', (req, res) => {
    const id = req.params.member_id;
    if (id in database){
        var temp = {};
        temp[id] = database[id];
        res.send({temp})
    }
    else{
        var temp = {};
        temp[id] = "None";
        res.send({temp})
    }
})

app.post('/membership_api/:member_id', (req, res) => {
    const id = req.params.member_id;
    if (id in database){
        database[id] = req.body[id]
        var temp = {};
        temp[id] = database[id];
        res.send({temp})
    }
    else{
        var temp = {};
        temp[id] = "None";
        res.send({temp})
    }
})

app.delete('/membership_api/:member_id', (req, res) => {
    const id = req.params.member_id;
    if (id in database){
        delete database[id]
        var temp = {};
        temp[id] = "Removed";
        res.send({temp})
    }
    else{
        var temp = {};
        temp[id] = "None";
        res.send({temp})
    }
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})