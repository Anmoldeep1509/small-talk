const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;
const path = require('path')



app.use(express.static(path.join(__dirname, 'public')))


// default page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});




// new user joined
io.on('add user', (socket) => {
    // hi to everyone except new join
    socket.broadcast.emit('chat message', 'Someone joined')
    // not working yet - 
    socket.on('disconnecting', (msg) => {
        io.emit('chat message', 'someone left ._.')
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    console.log(socket.username, ' joined room: ', socket.room);
    // new message
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});



io.on('connection', (socket) => {
    socket.broadcast.emit('chat message', 'Someone joined')
    console.log('new user detected');
})


// start server
server.listen(port, () => {
    console.log('listening on port %d', port);
});