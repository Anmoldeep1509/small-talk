// login varialbles
const login_box = document.getElementById("login");
const $name = document.getElementById("name");
const $user_id = document.getElementById("user-id");
const $room_name = document.getElementById("room-name");
const $window = window;

$name.focus()

// socket 
const socket = io();

var msg_form = document.getElementById('msg-form');
var msg_input = document.getElementById('msg-input');


// user specific variables

let username;

// join button action
const loginForm = document.getElementById("loginForm") || 0;


if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        login_box.style.display = "none";
        document.getElementById('messenger').style.display = "inline";
        username = setUsername();
        msg_input.focus();
    });
}


const setUsername = () => {
    username = $name.value;
    // room_name = $room_name.value;

    // socket.emit('add user', { username: username, room: room_name })
    console.log(username, ' joined the session');
    socket.emit('add user', { username: username })
    return username;
}



// send message action
msg_form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (msg_input.value) {
        // console.log(username);
        socket.emit('chat message', { msg: msg_input.value, user: username });
        msg_input.value = '';
    }
});





// events handlers

// new message received
socket.on('chat message', (arg) => {
    // console.log('new message detected');
    if (arg.msg && arg.user) {

        const messages = document.getElementById('messages');
        var new_msg = document.createElement('li');
        // console.log(messages);
        new_msg.className = 'list-group-item';
        console.log(arg);
        new_msg.textContent = arg.user + ': ' + arg.msg;

        messages.appendChild(new_msg);
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        console.log("new message event received without message body");
    }
})


// new user joined
socket.on('user added', (arg) => {
    if (arg.user) {

        const messages = document.getElementById('messages');
        var new_msg = document.createElement('li');
        // console.log(messages);
        new_msg.className = 'list-group-item';
        new_msg.textContent = arg.user + ' joined!';

        messages.appendChild(new_msg);
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        console.log("new message event received without message body");
    }
})