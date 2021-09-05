
import React, { useEffect } from 'react';
import axios from 'axios';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'

import wrapper from '../../store/configureStore'
import { END } from 'redux-saga'
import { LOAD_USER_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers/user'
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post'

import PostCard from '../../components/PostCard'


// 특정 사용자의 정보와 게시물만 가져오는거 구현해보기
const User = () => {

    const dispatch = useDispatch();
    const { mainPosts, infiniteLimit, loadUserPostsLoading,  } = useSelector(state => state.post)
    const { userInfo } = useSelector(state => state.user)

    const router = useRouter();
    const { id } = router.query;

    
    

    useEffect(() => {
        function scroll() {
            const bodyHeight = document.body.clientHeight;
            const currentHeight = window.pageYOffset;
            const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id
            if(bodyHeight - 100 < currentHeight + window.innerHeight && infiniteLimit && !loadUserPostsLoading) {
                console.log('?왜안댐')
                dispatch({
                    type: LOAD_USER_POSTS_REQUEST,
                    lastId: lastId,
                    data: id
                })
            }
        }
        window.addEventListener('scroll', scroll)
        return function() {
            window.removeEventListener('scroll', scroll)
        }
    }, [mainPosts.length, infiniteLimit, id])

    useEffect( () => {
        
        // dispatch({
        //     type: LOAD_USER_POSTS_REQUEST,
        //     data: id
        // })
        // dispatch({
        //     type: LOAD_USER_REQUEST,
        //     data: id
        // })
        // dispatch({
        //     type: LOAD_MY_INFO_REQUEST,
        // })

        // console.log('id:', id)
        // console.log('mainPosts:', mainPosts)
        // console.log('userInfo:', userInfo)
    }, [])


    return (
        <div style={{height: "2000px;"}}>user{id}
            { userInfo &&  (
                <div>
                    id: {userInfo.id}<br />
                    email: {userInfo.email}<br />
                    nickname: {userInfo.nickname}<br />
                    posts: {userInfo.posts}<br />
                    Followings: {userInfo.Followings}<br />
                    Followers: {userInfo.Followers}<br />
                </div>
            )}
            <br /><br />
            { mainPosts && mainPosts.map(data => <PostCard key={data.id} data={data} />)}
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps( async context => { 

    const cookie = context.req ? context.req.headers.cookie : '';    
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) { 
        axios.defaults.headers.Cookie = cookie; 
    }
    console.log('contextParams', context.params)

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    })
    context.store.dispatch({ 
        type: LOAD_USER_REQUEST, 
        data: context.params.id
    })
    context.store.dispatch({ 
        type: LOAD_USER_POSTS_REQUEST,
        data: context.params.id
    })

    context.store.dispatch(END) 
    await context.store.sagaTask.toPromise()
});


export default User;