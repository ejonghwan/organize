
import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';
import user from './user'
import post from './post'


// const rootReducer = combineReducers({
//         user,
//         post,
//     })



// redux devtool에 index안에 user post 를 덮어 씌울 수 있게
const rootReducer = (stats, action) => { 
    
    //기본형태에서 확장하려고 풀어서 만든거임. 맨첨에 만든 간단하게 만든거에서
    switch(action.type) {

        case HYDRATE: { // hydrate case 추가
            console.log('HYDRATE', action)
            return action.payload;
        }

        default: {
            const combinedReducers = combineReducers({
                user,
                post,
            });
            return combinedReducers(stats, action)
        }
    }
}




export default rootReducer;

