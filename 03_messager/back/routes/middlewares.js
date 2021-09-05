

//로그인한 사람과 안한사람 구분해서 
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        //next에 error를 넣으면 에러를 처리하고 아무것도 안넣으면 다음 미들웨어로 감
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.')
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다')
    }
}