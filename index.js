const express = require('express');
var cors = require('cors')

const bodyParser = require("body-parser");
const { connectDB } = require('./model/connectDB');
const router = require('./routes');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json({ extended: true }));
app.use('/',router)
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
    connectDB();
})

