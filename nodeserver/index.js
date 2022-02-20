const express = require('express');

const PORT = process.env.PORT || 3000;
const INDEX = '../index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


const iio = socketIO(server);

//node server which will handel socket io connections

// const io = require('socket.io')(8000, {
//     cors: {
//         origin: '*',
//       }
// });
const users = {};

iio.on('connection', socket =>{
    socket.on('new-user-joined', name1 =>{
        //console.log("New user", name1);
        users[socket.id] = name1;
        socket.broadcast.emit('user-joined', name1)
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name1: users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',  users[socket.id]);
        delete users[socket.id];
    });
})