


import { all, call, delay, fork, put, take, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

import postSaga from './post'
import userSaga from './user'

//baseURL은 앞에 중복을 줄여줌
axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true; // cors cookie 허용. 서버에서도 처리를 해주고 클라이언트에서도 처리를 해줘야 됨

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ])
}


// all()은 [] 로 받는데 받는 모든걸 한방에 실행해줌

// fork()는 해당 함수를 실행한다    - 비동기
// call() fork랑 비슷한데 다른게 있다   - 동기 !! 그래서 데이터받아온거엔 call써야됨 await랑 같음
// #### call fork는 첫번째 인자 함수에 매개변수가 다음꺼로 들어감

//put() 디스패치 같은 것 type data 등 받을수있음 

// take("action", func)
//takeEvery(action, func)
//## while true는 동기적 takeEvery는 비동기
//## take는 한번만 실행하고 끝나는 일회성
//takeLatest()는 몇십번 눌러도 마지막 요청만 가지만 요청은 백엔드에 계속 저장돼서 백엔드에서 처리해줘야댐 응답만 취소해줌
//##그래서 throttle(action, func, sec)은 세번째 인자에 시간을 줘서 그동안은 안가게함 
//takeLeading()은 맨첨거만

//delay(1000)

//쓰로틀링 디바운싱