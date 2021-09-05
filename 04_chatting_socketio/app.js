const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const socketIO = require('socket.io');

const moment = require('moment');

const io = socketIO(server)


app.use(express.static(path.join(__dirname, 'src'))) //현재경로 설정
const PORT = process.env.PORT || 5000; //포트


io.on('connection', (socket) => {
    // console.log('연결이 이루어졌습니다')
    socket.on('chatting', (data) => {
        // console.log(data)
        const { name, msg } = data; //프론트에서 받아온 데이터
        
        // 프론트로 보내기
        io.emit('chatting', {
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:ss A"),
        })
    })
})


server.listen(PORT, () => {
    console.log(PORT)
})