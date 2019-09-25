((io) => {
    'use strict';
    const socket = io();

    document.querySelector('#chat-form').addEventListener('submit', (event) => {
        event.preventDefault();
        socket.emit('chat message', document.querySelector('#message-text').value);
        document.querySelector('#message-text').value = null;
        return false;
    });

    socket.on('new user', (newUserMessage) => {
        document.querySelector('.alert-box-green').style.display ="inline-block";
        setInterval(()=> {
        document.querySelector('.alert-box-green').style.display ="none";
        }, 3000);
    });

    socket.on('message', (message)=>{
        let div = document.createElement('div');
        let li = document.createElement('li');
        let text = document.createTextNode(message);
        li.appendChild(text);
        div.appendChild(li);
        document.querySelector('#chat').appendChild(div);
    });

    socket.on('user left', (newUserMessage) => {
        document.querySelector('.alert-box-red').style.display ="inline-block";
        setInterval(()=> {
        document.querySelector('.alert-box-red').style.display ="none";
        }, 3000);
    });

})(io);
