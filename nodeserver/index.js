//node server which will handel socket io connections

const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
      }
});
const users = {};

io.on('connection', socket =>{
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