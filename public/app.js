const socket = io('https://socket-demo-2aob.onrender.com');

// Hide the chat box initially
$('#chat-box').hide();

// Handle the send button click
$('#send-btn').on('click', () => {
    const msgText = $('#inp').val().trim();
    if (msgText) {
        socket.emit('send-msg', { msg: msgText });
        $('#inp').val('');
    }
});

// Handle receiving messages
socket.on('receive-msg', (data) => {
    if (data && data.username && data.msg) {
        $('#chat').append(`<li class="border p-3 ms-0 mb-0 rounded-pill">
            <span class="fw-bold">${data.username}</span>
            <span> ${data.msg}</span>
        </li>`);
    }
});

// Handle login button click
$('#login-btn').on('click', () => {
    const username = $('#username').val().trim();
    if (username) {
        socket.emit('login', { username: username });
        $('#login').hide();
        $('#chat-box').show();
        $('#username').val("");
    } else {
        alert("Please enter a username.");
    }
});
