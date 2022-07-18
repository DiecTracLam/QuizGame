const express = require('express');

const bodyParser = require("body-parser");
const { connectDB } = require('./model/connectDB');
const router = require('./routes');
const app = express()
const port = 5000

app.use(bodyParser.json({ extended: true }));
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
    connectDB();
})

app.use('/',router)