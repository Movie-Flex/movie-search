require('dotenv').config();
const express = require('express');
const cors= require('cors')
const app = express()

const routes = require('./routes/route');

const port = process.env.API_PORT;

app.use(express.json()); 
app.use(cors())
app.use(express.urlencoded({ extended: true })); 

app.listen(port, () => {
    console.log(`Server listening on port : ${port}`);
});

app.use('/api', routes);

app.use((req, res) => {
    res.status(404).json({ error: "No such page exists!" });
});


