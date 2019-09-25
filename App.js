'use stric';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const publicDir = express.static(`${__dirname}/public`);
const port = process.env.port || 3000;

app.use(publicDir);

app.get('/', (req,res) => {
    res.sendFile('/index.html');
});

io.on('connection', (socket) => {
    socket.broadcast.emit('new user', {message: 'Se ha conectado un nuevo usuario al chat'});

    socket.on('chat message', (data)=>{
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user left', {msg: 'Un usuario se ha desconectado del chat'});
    });
});

http.listen(port, (req,res) => console.log(`Iniciando Chat en localhost:${port}`));
