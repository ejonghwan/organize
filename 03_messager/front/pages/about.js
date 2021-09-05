


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_USER_REQUEST } from '../reducers/user'

import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

const About = () => {

    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch()
    console.log(userInfo)
    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_USER_REQUEST,
    //         data: 11
    //     })
        
    // }, [])

    return (
        <div>
            {userInfo ?
                (
                    <div>
                        nickname: {userInfo.nickname}<br />
                        followings: {userInfo.Followings}<br />
                        followers: {userInfo.Followers}<br />
                    </div>
                ) : null
            }
        </div>
    );
};


/* 
    getStaticProps는 build를 할 때 데이터를 어느정도 불러와서 미리 저장해서 빌드까지 해버림.
    그래서 데이터를 그떄그떄 불러와서 갈아끼우는 곳에는 안 맞음. 대신 소개페이지나 데이터 변경이 별로 없는 곳  이런데는 괜찮. 개빠름
*/
export const getStaticProps = wrapper.getStaticProps(async (context) => {
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: 11
    })

    context.store.dispatch(END)
    await context.store.sagaTask.toPromise();
})

export default About;