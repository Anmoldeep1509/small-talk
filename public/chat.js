// login varialbles
const login_box = document.getElementById("login");
const $name = document.getElementById("name");
const $user_id = document.getElementById("user-id");
const $room_name = document.getElementById("room-name");


// socket 
const socket = io();

var msg_form = document.getElementById('msg-form');
var msg_input = document.getElementById('msg-input');


// send message action
msg_form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (msg_input.value) {
        socket.emit('chat message', msg_input.value);
        msg_input.value = '';
    }
});

// join button action
const join_btn = document
    .getElementById("join-btn") || 0;


if (join_btn) {
    join_btn.addEventListener("click", function (event) {
        event.preventDefault();

        login_box.style.display = "none";
        document.getElementById('messenger').style.display = "inline";
        setUsername();
    });
}




const setUsername = () => {
    username = $name.value;
    room_name = $room_name.value;

    socket.emit('add user', { username: username, room: room_name })
    console.log(username, ' joined the session');
}




// events handlers

socket.on('chat message', (msg) => {
    // console.log('new mesage detected');
    const messages = document.getElementById('messages')
    var new_msg = document.createElement('li')
    // console.log(messages);
    new_msg.className = 'list-group-item'
    new_msg.textContent = msg

    messages.appendChild(new_msg)
    window.scrollTo(0, document.body.scrollHeight)
})