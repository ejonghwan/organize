console.log('js')

"use strict"

const socket = io();
const nickname = document.querySelector('#nickname')
const list = document.querySelector('.list')
const chatInput = document.querySelector('.chat_val')
const submit = document.querySelector('.submit')
const displayC = document.querySelector('.display-c')



submit.addEventListener('click', (e) => {
    const param = {
        name: nickname.value, //input value
        msg: chatInput.value,
    }

    socket.emit('chatting', param)
})


// 서버에서 받은
socket.on('chatting', (data) => {
    console.log(data)
    // const item = new LiModel(data.name, data.msg, data.time);
    const { name, msg, time } = data
    const item = new LiModel()
    item.make(name, msg, time)

    window.scrollTo(0, displayC.scrollHeight)
    // console.log(displayC.scrollHeight)
})




function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;
}


LiModel.prototype.make = (name, msg, time) => {
    const li = document.createElement('li');
    li.classList.add(nickname.value === name ? 'sent' : 'received')
    const dom = `
            <div class="img">
                <img src="https://placeimg.com/50/50/any" alt="">
            </div>
            <div class="user">
                <span class="name">${name}</span>
                <span class="msg">${msg}</span>
            </div>
            <div class="time">${time}</span>
        `

    li.innerHTML = dom;
    list.appendChild(li)
}

// console.log(socket)