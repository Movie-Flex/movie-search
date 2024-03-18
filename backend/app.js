require('dotenv').config();
const express = require('express');
const cors= require('cors')
const app = express()
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const path = require('path');

const port = process.env.API_PORT;

app.use(express.json()); 
app.use(cors())
app.use(express.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server listening on port : ${port}`);
});

app.use('/api', routes);

app.use('/payment', routes);


app.use((req, res) => {
    res.status(404).json({ error: "No such page exists!" });
});


