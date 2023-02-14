const express = require('express');
const app = express();
var bodyParser = require("body-parser");
const API_BASE_URL = process.env.API_BASE_URL;
const PORT = process.env.PORT || 4000;
const cors = require('cors')
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config.js')

global.__basedir = __dirname;
mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected', () => {
    console.log('db connected');
})

app.use(cors());
app.use(express.json());

require('./models/user_model')
require('./models/sale_model')

app.use(require('./routes/user_route'));
// app.use(require('./routes/sale_route'));

app.get("/", (req, res) => {
    res.json("server started")
})

app.listen(PORT, () => {
    console.log("server statred")
})