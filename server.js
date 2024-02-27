const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const personaRouter = require("./router/personaRouter");
const personaUserRouter = require("./router/personaUserRouter");
const arcanaRouter = require("./router/arcanaRouter");
const app = express();

app.use(cors());
app.use(express.json());
app.use(personaRouter);
app.use(personaUserRouter);
app.use(arcanaRouter);

app.listen (3000, (err) => {
    if (err){
        console.log(err);
    }else{
        console.log("Connecté au serveur port 3000")
    }
})

mongoose.connect('mongodb://localhost:27017/apipersona');