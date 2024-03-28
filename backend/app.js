require('dotenv').config();
const express = require('express');
const cors= require('cors')
const app = express()
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const https = require('https');
var http = require('http');
const fs = require('fs');
const path = require('path');

const HTTP_PORT = process.env.API_PORT;
const HTTPS_PORT = 3001;
const HOST = 'localhost';

app.use(express.json()); 
app.use(cors())
app.use(express.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// FOR USING SSL/TLS :
let options;
try {
  options = {
    key: fs.readFileSync('./ssl/key.pem', 'utf8'),
    cert: fs.readFileSync('./ssl/server.crt', 'utf8'),
  };
} catch (err) {
  console.error('Error reading SSL/TLS files:', err);
  options = null;
}
// FOR HTTPS server
if (options) {
  const server = https.createServer(options, app);

  server.listen(HTTPS_PORT, () => {
    console.log('HTTPS Server listening on %s : %s', HOST, HTTPS_PORT);
  });

  server.on('error', (err) => {
    console.error('HTTPS server error:', err);
  });
} else {
  console.log('SSL/TLS files not found. HTTPS server not started.');
}

// FOR HTTP server
http.createServer(app).listen(HTTP_PORT, () => {
  console.log('HTTP Server listening on %s : %s', HOST, HTTP_PORT);
});

app.use('/api', routes);

app.use('/payment', routes);

app.use((req, res) => {
    res.status(404).json({ error: "No such page exists!" });
});

