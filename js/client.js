// const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));


// const socket = io(server);
const io = require('socket.io-client');
const socket = io();

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('tone.mp3');

//const whoamiContainer = document.getElementById('whoami');
// //To show whose screen we are looking 
// const info = (data) => {
//     whoamiContainer.textContent=data;
// }


const append=(message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(`${position}`);
    messageContainer.append(messageElement);
    if(position =='left')
    {
        audio.play();
    }
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const name1 = prompt("Enter your name to join");
socket.emit('new-user-joined', name1)

socket.on('user-joined', name1 =>{
    append(`${name1} joined the chat`, 'right')
    info(`This is ${name1}'s page.`);
})

socket.on('receive', data =>{
    append(`${data.name1}: ${data.message}`, 'left')
})

socket.on('left', name1 =>{
    append(`${name1} left the chat`, 'right')
})