
import { all, call, delay, fork, put, takeLatest, throttle } from "@redux-saga/core/effects";
import axios from 'axios'

import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, 
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
    generaterDummyPost,
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE, 
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_SUCCESS,
    RETWEET_REQUEST, RETWEET_FAILURE, RETWEET_SUCCESS, LOAD_POST_REQUEST, LOAD_POST_FAILURE, LOAD_POST_SUCCESS, LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_FAILURE, LOAD_USER_POSTS_SUCCESS, LOAD_HASHTAG_REQUEST, LOAD_HASHTAG_FAILURE, LOAD_HASHTAG_SUCCESS,
    
} from '../reducers/post'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME} from '../reducers/user'


function randomKey() {
    return Math.random().toString(36).substr(2)
}

function addpostAPI(data) {
    // return axios.post('/post', { content: data })
    return axios.post('/post', data) //formData는 무조건 받은 그대로
}

function* addpost(action) {
    const result = yield call(addpostAPI, action.data) 
    // yield delay(1000)
    // const id = randomKey()
    try {
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
            // data: {
            //     id,
            //     content: action.data,
            // }

        })

        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        })

    } catch(err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function removePostAPI(data) {
    return axios.delete(`/post/${data}/delete`) //delete는 두번째 인자에 data 못넣음. 요청패스에 넣으몀ㄴ 됨 ㅎㅎ
}

function* removePost(action) {
    
    try {
        const result = yield call(removePostAPI, action.data)
        // yield delay(1000)
        yield put({
            type: REMOVE_POST_SUCCESS,
            // data: action.data, 
            data: result.data,
        })

        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        })
    } catch(err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            data: action.error
        })
    }
}


function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data) // post/post/1/comment
}

function* addComment(action) {
    // yield delay(1000)
    try {
        // console.log('asdasdasd!!!!!', action.data)
        const result = yield call(addCommentAPI, action.data) 
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
            // data: action.data,
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }
}

//get은 query string으로 보내는데 이렇게되면 데이터까지 같이 캐싱이 됨. post put patch는 데이터 캐싱 안됨
function loadPostsAPI(data) {
    return axios.get(`/posts?lastId=${data || 0}`) //lastId가 undefind면 0으로 
}

function* loadPosts(action) {
    // yield delay(1000);
    try {
        const result = yield call(loadPostsAPI, action.lastId)  //2번째 인자는 dispatch할떄 보내준 데이터 키값
        yield put({
            type: LOAD_POSTS_SUCCESS,
            // data: generaterDummyPost(10)
            data: result.data,
        })
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data
        })
    }
}

function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`) //데이터는 인자로 안넣어도 됨. 요청에 있기 때문에 post/:postId/like 로 가져올수있음. req.params.postId 
}
function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data)
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response.data
        })
    }
}

function unlikePostAPI(data) {
    return axios.delete(`/post/${data}/unlike`)
}
function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data)
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response.error
        })
    }
}


function uploadImagesAPI(data) {
    return axios.post('/post/images', data) // 여기들어오는 form 데이터는 {} 객체로 감싸면 json이 돼 버려서 절대안됨. form데이턴,ㄴ form으로 
}

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data)
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data
        })
    }
}


function retweetAPI(data) {
    return axios.post(`/post/retweet/${data}`, data)
}
function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data)
        yield put({
            type: RETWEET_SUCCESS,
            data: result.data
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: RETWEET_FAILURE,
            error: err.response.data,
        })
    }
}

function loadpostAPI(data) {
    return axios.get(`/post/${data}`)
}

function* loadpost(action) {
    try {
        const result = yield call(loadpostAPI, action.data)
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response.data,
        })
    }
}


// test
// function loaduserpostsAPI(data, lastId) {
//     return axios.get(`/post/${data}/posts?lastId=${lastId || 0}`)
// }

// function* loaduserposts(action) {
//     // console.log('??????', action)
//     try {
//         const result = yield call(loaduserpostsAPI, action.data, action.lastId)
//         yield put({
//             type: LOAD_USER_POSTS_SUCCESS,
//             data: result.data,
//         })
//     } catch(err) {
//         console.error(err)
//         yield put({
//             type: LOAD_USER_POSTS_FAILURE,
//             error: err.response.data,
//         })
//     }
    
// }

// post saga에서 user 라우트에 요청
function loaduserpostsAPI(data, lastId) {
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`)
}

function* loaduserposts(action) {
    // console.log('??????', action)
    try {
        const result = yield call(loaduserpostsAPI, action.data, action.lastId)
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}

function loadhashtagAPI(data, lastId) {
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`)
}

function* loadhashtag(action) {
    try {
        const result = yield call(loadhashtagAPI, action.data, action.lastId)
        yield put({
            type: LOAD_HASHTAG_SUCCESS,
            data: result.data,
        })

    } catch(err) {
        console.error(err)
        yield put({
            type: LOAD_HASHTAG_FAILURE,
            error: err.response.data,
        })
    }
}


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addpost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchloadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchlikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchunlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watcUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet);
}

function* watchLoadpost() {
    yield takeLatest(LOAD_POST_REQUEST, loadpost);
}

function* watchLoaduserposts() {
    yield throttle(5000, LOAD_USER_POSTS_REQUEST, loaduserposts);
}

function* watchLoadHashtag() {
    yield takeLatest(LOAD_HASHTAG_REQUEST, loadhashtag);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchloadPosts),
        fork(watchlikePost),
        fork(watchunlikePost),
        fork(watcUploadImages),
        fork(watchRetweet),
        fork(watchRetweet),
        fork(watchLoadpost),
        fork(watchLoaduserposts),
        fork(watchLoadHashtag),
    ])
}