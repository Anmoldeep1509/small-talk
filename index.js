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
io.on('connection', (socket) => {
    // 
    console.log("new user");
    // io.emit('chat message', '')

    socket.on('add user', (user) => {
        io.emit('user added', { user: user.username })
    })
    socket.on('chat message', (socket) => {
        // console.log("new text from client: ", socket.msg);
        io.emit('chat message', { msg: socket.msg, user: socket.user })
    })

})


// start server
server.listen(port, () => {
    console.log('listening on port %d', port);
});