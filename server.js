const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const wiredPort = 'COM5'; 
const baudRate = 9600; 

const port = new SerialPort({ 
    path: wiredPort, 
    baudRate: baudRate,
    autoOpen: true 
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

port.on('open', () => console.log(`✅ USB Connected on ${wiredPort}`));

parser.on('data', (data) => {
    io.emit('radarData', data); 
});

server.listen(3000, () => {
    console.log(`🚀 Radar System Online: http://localhost:3000`);
});