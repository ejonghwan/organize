const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local'); //스트레이티지 기본명을 바꾸는 이유는 나중에 kakao 등 여러개가 생겨서 ㅋㅋ
const bcrypt = require('bcrypt')
const { User } = require('../models')


module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', //req.body.email 프론트에서 받아온 req.body에 담아놓은걸 가져왔음
        passwordField: 'password'
    }, async(email, password, done) => {

        try {
            //1. 일단 DB에 User에 접근해서 이메일 찾고
            const user = await User.findOne({
                where: { email }
            })

            //2. 이메일 없으면 여기서 걸러짐
            if(!user) {
                return done(null, false, { reason: '존재하지 않는 email입니다!' }) //1. 서버에러 2. 성공 3. 클라이언트 에러(보내는쪽에서 잘못보내서 에러)
            }

            //3. 패스워드 비교 후 리턴 
            const result = await bcrypt.compare(password, user.password) //비교해주는 식. 1. 우리가 입력한 패스워드 2. 디비에 저장된 패스워드
            if(result) {
                return done(null, user) //둘 다 일치하면 2. 에다 사용자 정보 넘겨줌
            }
            return done(null, false, { reason: '비밀번호가 틀렸습니다' });

        } catch(error) {
            console.error(error)
            return done(error)
        }
        
        

    }));
};

