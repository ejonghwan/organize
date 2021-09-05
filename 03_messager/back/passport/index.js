const passport = require('passport')
const local = require('./local')
const { User } = require('../models')

// 인증하는 곳의 앱만들고 아래 절차대로
// http://www.passportjs.org/packages/passport-kakao/

//passport 설정파일
module.exports = () => {
    passport.serializeUser((user, done) => { //route > user파일에 req.login에 user가. 여기 user로 들어옴
        // user에 req.login이랑 동시에 실행됨
        done(null, user.id) //세션에 다 넣어두기 무거우니깐 아이디만 저장해둠
        
        
    });

    passport.deserializeUser( async (id, done) => {

        try {
            // 위에서 세션으로 저장한 id를 가져와서 db에서 id랑 매칭되어있는 애를 꺼내옴
            const user = await User.findOne({ where: { id } })
            done(null, user)
        } catch(err) {
            console.error(err)
            done(err)
        }
        
    });

    local();
};