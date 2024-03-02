// This is where we will create our express and socket io server

const fs = require('fs');
const https = require('https');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

const key = fs.readFileSync('./certs/cert.key');
const cert = fs.readFileSync('./certs/cert.crt');

const expressServer = https.createServer({ key, cert }, app);


const io = socketio(expressServer, {
    cors: ['https://localhost:3000', 'http://localhost:3001', 'http://localhost:3003']
});

expressServer.listen(9000);

module.exports = { io, expressServer, app };
