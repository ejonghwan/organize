// const http = require('http')
// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method)
//     res.end('hello node')
// })

// server.listen(3060, () => {
//     console.log('server on')
// })

// RESTAPI 자주사용
// app.get  가져오다
// app.post 생성하다
// app.put 전체수정
// app.delete 제거
// app.patch 부분 수정
// app.options 찔러보기
// app.head 헤더만 가져오기 (헤더/본문 중 헤더만)



const express = require('express')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const postsRouter = require('./routes/posts')
const hashtagRouter = require('./routes/hashtag')
const db = require('./models')
const app = express()
const cors = require('cors')


const morgan = require('morgan')
const path = require('path') 

// const multer = require('multer')
const fs = require('fs') //파일 시스템 조작할 수 있는 노드모듈. 그냥 만들어도 되고 이거로 만들어도 되고 ㅎㅎ
try {
    fs.accessSync('uploads')
} catch(error) {
    console.log('uploads 폴더가 없어서 생성함')
    fs.mkdirSync('uploads')
}

// 아래 폴더경로에 있는 파일을 프론트에서 바라볼 수 있게해줌. 스태틱한 폴더
// /는 localhost3065/ 이게 됨
app.use('/', express.static(path.join(__dirname, 'uploads'))) //현재폴더 안에 'uploads' 폴더를 합쳐줌. +로 하지않고 join써야됨..경로가 운영체제마다 달라서 


const bcrypt = require('bcrypt')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const dotenv = require('dotenv')

// passport 설정 가져오기
const passportConfig = require('./passport/index')
passportConfig()


//시퀄라이즈 마지막으로 앱이랑 연결    !!! npx sequelize db:create 이거해서 디비부터 생성
db.sequelize.sync()
    .then(() => {
        console.log('db connected')
    })
    .catch(console.error)



// session cookie설정
dotenv.config()
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: 'http://localhost:3060', //true로 하면 *대신 보낸곳의 주소가 자동으로 들어가 편리. //지금은 다 허용이지만 나중엔 내 도메인만
    credentials: true, // 쿠키도 허용해줌
}))
app.use(morgan('dev')) // 서버쪽 기록저장해주는 미들웨어

// .use는 express에 뭔가 장착해서 넣어준다는건데 클라이언트에서 post put patch로 보내준 데이터를 해석해서 body에 넣어줌. use안에는 middleware넣어줌. 순서중요
app.use(express.json()) // front안에 json으로 보냈을 때 req.body안에 json으로 넣어줌. axios같은거 쓸때 
app.use(express.urlencoded({ extended: true })); // form submit했을떄 urlincoded방식으로 넘겨주는데 이걸 해석해서 req.body에 넣어줌

/* 
extended: true는 querystring 대신에 qs 모듈을 사용해서 쿼리스트링(? 뒷 부분)을 파싱한다고 설정하는 겁니다.
https://www.npmjs.com/package/qs
qs 모듈이 노드 내장 모듈인 querystring에 비해 기능도 많고(배열 등을 지원합니다) 활용도가 높습니다.
http://localhost:3065/search?year=2020
req.query.year <- 2020
qs모듈이란 ? 뒤에오는 저부분을 req.query에 저장시키는 역할
*/


// npm i multer encType="multipart/form-data"프론트에서 멀티파트형식으로 보낼때 쓰는 multer
// app.use(multer()) 멀터는 사용하는 라우터에 셋팅해서 넣는게 좋음. 







app.use('/post', postRouter)
app.use('/posts', postsRouter)
app.use('/user', userRouter)
app.use('/hashtag', hashtagRouter)





app.listen(3065, () => {
    console.log('server')
})