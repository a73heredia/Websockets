const express = require('express');
const { Server } = require('socket.io');
const app = express();
const PORT = 8080;

app.use(express.static(__dirname + "/public"));



//Servidor Express
const server = app.listen(PORT, () => console.log('Runing on 8080'));

//Servidor Websockets
const io = new Server(server);
let history = [];

io.on('connection', (socket) => {
    console.log('new user', socket.id);
    socket.broadcast.emit('newUsser');
    socket.on('message', data => {
        console.log(data);
        history.push(data);
        io.sockets.emit('history', history);
    })
})
