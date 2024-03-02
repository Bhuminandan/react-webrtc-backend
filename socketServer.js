// For Socket io

const io = require('./server').io;

io.on('connection', (socket) => {
    console.log(socket.id + ' is connected');
})