const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// --- IMPORTANT: Change 'COM8' to your HC-05 Outgoing COM Port ---
const bluetoothPort = 'COM9'; 

const port = new SerialPort({ path: bluetoothPort, baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

io.on('connection', (socket) => {
    console.log('✔ Dashboard Linked to Bridge');
});

parser.on('data', (data) => {
    // Sends "angle,distance" to the web dashboard
    io.emit('radarData', data); 
});

server.listen(3000, () => {
    console.log(`🚀 Bridge active on http://localhost:3000`);
    console.log(`📡 Listening to Bluetooth on ${bluetoothPort}...`);
});