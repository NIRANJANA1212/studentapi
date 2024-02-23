const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());


let Student = require('./student.model');
mongoose.connect("mongodb+srv://niranjana12340:lPpHwSBv9LUr8jOI@cluster0.u3n3dvp.mongodb.net/studentdatabase?retryWrites=true&w=majority&appName=Cluster0");
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

app.get('/', (req, res) => {
    console.log('request received');
    res.json("hello world!");
});

// app.listen('4000', () => {
//      console.log('server started');
// });

app.get('/hii', (req, res) => {
    console.log('request received');
    res.json("welcome to nodemon");
});

app.get('/people', (req, res) => {
    console.log({ name: 'John', role: 'trainer' }, { name: 'colin', role: 'triner' });
    res.json("welcome to nodemon");
});

app.get('/students', async (req, res) => {
    console.log('students request received');
    let data = await Student.find().catch(err => {
        res.json(err);
    });
    res.json(data);
    // res.json([{name:"Tiya",age:'10' ,department:'cse'},
    // {name:"Maya",age:'20' ,department:'cse'},
    // {name:"Kuttus",age:'30' ,department:'cse'}]);
});

app.get('/students/:id', async (req, res) => {
    let id = req.params.id;
    let data = await Student.findById(id).catch(err => {
        res.json("Error finding student");
    });
    if (!data) {
        res.json("not found");
    }
    else {
        res.json(data);
    }
});

app.delete("/students/:id", async (req, res) => {
    let id = req.params.id;
    await Student.findByIdAndDelete(id)
        .then(() => {
            res.json("Data removed successfully")
        })
        .catch((err) => {
            res.json("failed deleting data")
        });
});




app.post('/students', (req, res) => {
    console.log(req.body);
    let student = new Student(req.body);
    student.save()
        .then(() => {
            res.json("saved successfully");

        })
        .catch(err => {
            res.json('error' + err);
        })
});


app.listen("4001", (req, res) => {
    console.log("started server on 4001");
});


