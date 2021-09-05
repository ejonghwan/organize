
import produce from 'immer' 

export const initialState = {
    loginLoading: false,
    loginDone: false,
    loginError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: null,
    signupLoading: false,
    signupDone: false,
    signupError: null,
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: null,
    me: null,
    userInfo: null,
    loginData: {},
    signupData: {},
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: null,
    loadMyInfoLoading: false, //유저정보 가져오기
    loadMyInfoDone: false,
    loadMyInfoError: null,
    loadFollowersLoading: false, 
    loadFollowersDone: false,
    loadFollowersError: null,
    loadFollowingsLoading: false, 
    loadFollowingsDone: false,
    loadFollowingsError: null,
    removeFollowLoading: false, 
    removeFollowDone: false,
    removeFollowError: null,
    loadUserLoading: false, 
    loadUserDone: false,
    loadUserError: null,
}

// const dummyUser = data => ({
//     ...data,
//     nickname: 'jjong',
//     Posts: [{id: 1}, ],
//     Followings: [{nickname: 'a'},{nickname: 'b'},{nickname: 'c'},{nickname: 'd'},{nickname: 'e'},{nickname: 'f'},],
//     Followers: [{nickname: 'a'},{nickname: 'b'},{nickname: 'c'},{nickname: 'd'},{nickname: 'e'},{nickname: 'f'},],
// })




export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST"
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS"
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE"

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const LOGOUT_REQUEST = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"

export const SIGNUP_REQUEST = "SIGNUP_REQUEST"
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SiGNUP_FAILURE = "SiGNUP_FAILURE"

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST"
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS"
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE"

export const FOLLOW_REQUEST = "FOLLOW_REQUEST"
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS"
export const FOLLOW_FAILURE = "FOLLOW_FAILURE"

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST"
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS"
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE"

export const ADD_POST_TO_ME = "ADD_POST_TO_ME"
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME"

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST"
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS"
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE"

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST"
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS"
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE"

export const REMOVE_FOLLOW_REQUEST = "REMOVE_FOLLOW_REQUEST"
export const REMOVE_FOLLOW_SUCCESS = "REMOVE_FOLLOW_SUCCESS"
export const REMOVE_FOLLOW_FAILURE = "REMOVE_FOLLOW_FAILURE"

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST"
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS"
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE"



export const login_request_action = (data) => {
    return {
        type: LOGIN_REQUEST,
        data: data,
    }    
}

export const logout_request_action = () => {
    return {
        type: LOGOUT_REQUEST,
    }
}



const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {

            case LOAD_MY_INFO_REQUEST: {
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoDone = false;
                draft.loadMyInfoError = null;
                break;
            }

            case LOAD_MY_INFO_SUCCESS: {
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = true;
                draft.me = action.data;
                draft.loadMyInfoError = null
                break;
            }

            case LOAD_MY_INFO_FAILURE: {
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = false;
                draft.loadMyInfoError = action.error;
                break;
            }

            case LOGIN_REQUEST: {
                draft.loginLoading = true;
                draft.loginDone = false;
                draft.loginError = null;
                break;
            }

            case LOGIN_SUCCESS: {
                draft.loginDone = true;
                draft.loginLoading = false;
                // draft.me = dummyUser(action.data);
                draft.me = action.data;
                break;
            }

            case LOGIN_FAILURE: {
                draft.loginLoading = false;
                draft.loginDone = false;
                draft.loginError = action.error;
                break;
            }

            case LOGOUT_REQUEST: {
                draft.logoutLoading = true;
                draft.logoutDone = false;
                draft.logoutError = null;
                break;
            }

            case LOGOUT_SUCCESS: {
                draft.logoutLoading = false;
                draft.logoutDone = true;
                draft.me = null;
                break;
            }

            case LOGOUT_FAILURE: {
                draft.logoutLoading = false;
                draft.logoutDone = false;
                draft.logoutError = action.error;
                break;
            }

            case SIGNUP_REQUEST: {
                draft.signupLoading = true;
                draft.signupDone = false;
                draft.signupError = null;
                break;
            }

            case SIGNUP_SUCCESS: {
                draft.signupLoading = false;
                draft.signupDone = true;
                break;
            }

            case SiGNUP_FAILURE: {
                draft.signupLoading = false;
                draft.signupError = action.error;
                break;
            }

            case CHANGE_NICKNAME_REQUEST: {
                draft.changeNicknameLoading = true;
                draft.changeNicknameDone = false;
                draft.changeNicknameError = null;
                break;
            }

            case CHANGE_NICKNAME_SUCCESS: {
                draft.me.nickname = action.data.nickname;
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                break;
            }

            case CHANGE_NICKNAME_FAILURE: {
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            }
       
            case ADD_POST_TO_ME: {
                draft.me.Posts.unshift({id: action.data})
                break;
            }

            case REMOVE_POST_OF_ME: {
                // console.log(action)
                draft.me.Posts = draft.me.Posts.filter(val => val.id !== action.data)
                break;
            }

            case FOLLOW_REQUEST: {
                draft.followLoading = true;
                draft.followDone = false;
                draft.followError = null;
                break
            }

            case FOLLOW_SUCCESS: {
                draft.followLoading = false;
                draft.followDone = true;
                draft.followError = null;
                draft.me.Followings.push({ id: action.data.UserId })
                break
            }

            case FOLLOW_FAILURE: {
                draft.followLoading = false;
                draft.followDone = false;
                draft.followError = action.error;
                break
            }

            case UNFOLLOW_REQUEST: {
                draft.unfollowLoading = true;
                draft.unfollowDone = false;
                draft.unfollowError = null;
                break
            }

            case UNFOLLOW_SUCCESS: {
                // console.log(state.me.Followings)
                draft.unfollowLoading = false;
                draft.unfollowDone = true;
                draft.unfollowError = null;
                draft.me.Followings = draft.me.Followings.filter(val => val.id !== action.data.UserId)
                break
            }

            case UNFOLLOW_FAILURE: {
                draft.unfollowLoading = false;
                draft.unfollowDone = false;
                draft.unfollowError = action.error;
                break
            }

            case LOAD_FOLLOWERS_REQUEST: {
                draft.loadFollowersLoading = true;
                draft.loadFollowersDone = false;
                draft.loadFollowersError = null;
                break;
            }

            case LOAD_FOLLOWERS_SUCCESS: {
                draft.loadFollowersLoading = false;
                draft.loadFollowersDone = true;
                draft.me.Followers = action.data;
                draft.loadFollowersError = null
                break;
            }

            case LOAD_FOLLOWERS_FAILURE: {
                draft.loadFollowersLoading = false;
                draft.loadFollowersDone = false;
                draft.loadFollowersError = action.error;
                break;
            }

            case LOAD_FOLLOWINGS_REQUEST: {
                draft.loadFollowingsLoading = true;
                draft.loadFollowingsDone = false;
                draft.loadFollowingsError = null;
                break;
            }

            case LOAD_FOLLOWINGS_SUCCESS: {
                draft.loadFollowingsLoading = false;
                draft.loadFollowingsDone = true;
                draft.me.Followings = action.data;
                draft.loadFollowingsError = null
                break;
            }

            case LOAD_FOLLOWINGS_FAILURE: {
                draft.loadFollowingsLoading = false;
                draft.loadFollowingsDone = false;
                draft.loadFollowingsError = action.error;
                break;
            }

            case REMOVE_FOLLOW_REQUEST: {
                draft.removeFollowLoading = true;
                draft.removeFollowDone = false;
                draft.removeFollowError = null;
                break
             }
 
             case REMOVE_FOLLOW_SUCCESS: {
                 draft.removeFollowLoading = false;
                 draft.removeFollowDone = true;
                 draft.removeFollowError = null;
                 draft.me.Followers = draft.me.Followers.filter(val => val.id !== action.data.UserId)
                 break
              }
 
              case REMOVE_FOLLOW_FAILURE: {
                 draft.removeFollowLoading = false;
                 draft.removeFollowError = action.error;
                 break
              }

              case LOAD_USER_REQUEST: {
                draft.loadUserLoading = true;
                draft.loadUserDone = false;
                draft.loadUserError = null;
                break
             }
 
             case LOAD_USER_SUCCESS: {
                //  draft.loadUserLoading = false;
                //  draft.loadUserDone = true;
                //  draft.loadUserError = null;
                draft.loadUserLoading = false;
                draft.userInfo = action.data;
                draft.loadUserDone = true;
                 break
              }
 
              case LOAD_USER_FAILURE: {
                 draft.loadUserError = action.error;
                 break
              }

            default: break;                 
            
        }
    })
    
}

export default reducer



// switch(action.type) {
//     case LOGIN_REQUEST :
//         return {
//             ...state,
//             loginLoading: true,
//             loginDone: false,
//             loginError: null,
//         }
    
//     case LOGIN_SUCCESS :
        
//         return {
//             ...state,
//             loginDone: true,
//             loginLoading: false,
//             me: dummyUser(action.data),
//         }

//     case LOGIN_FAILURE :
//         return {
//             ...state,
//             loginLoading: false,
//             loginError: action.error,
//         }

//     case LOGOUT_REQUEST : 
//         return {
//             ...state,
//             logoutLoading: true,
//             logoutDone: false,
//             logoutError: null
//         }

//     case LOGOUT_SUCCESS : 
//         return {
//             ...state,
//             // loginDone: false,
//             logoutLoading: false,
//             logoutDone: true,
//             me: null,
//         }

//     case LOGOUT_FAILURE : 
//         return {
//             ...state,
//             logoutLoading: false,
//             logoutError: action.error,
//         }

//     case SIGNUP_REQUEST : 
//         return {
//             ...state,
//             singupLoading: true,
//             singupDone: false,
//             singupError: null
//         }

//     case SIGNUP_SUCCESS : 
//         return {
//             ...state,
//             singupLoading: false,
//             singupDone: true,
//         }

//     case SiGNUP_FAILURE : 
//         return {
//             ...state,
//             singupLoading: false,
//             singupError: action.error,
//         }

//     case CHANGE_NICKNAME_REQUEST : 
//         return {
//             ...state,
//             changeNicknameLoading: true,
//             changeNicknameDone: false,
//             changeNicknameError: null
//         }

//     case CHANGE_NICKNAME_SUCCESS : 
//         return {
//             ...state,
//             changeNicknameLoading: false,
//             changeNicknameDone: true,
//         }

//     case CHANGE_NICKNAME_FAILURE : 
//         return {
//             ...state,
//             changeNicknameLoading: false,
//             changeNicknameError: action.error,
//         }

//     case ADD_POST_TO_ME: {
//         return {
//             ...state,
//             me: {
//                 ...state.me,
//                 Posts: [{id: action.data}, ...state.me.Posts]
//             }
//         }
//     }

//     case REMOVE_POST_OF_ME: {
//         return {
//             ...state,
//             me: {
//                 ...state.me,
//                 Posts: state.me.Posts.filter(val => val.id !== action.id)
//             }
//         }
//     }
//     default: return state
// }