import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';
import { LOAD_HASHTAG_REQUEST } from '../../reducers/post';
import axios from 'axios';
import Head from 'next/head'
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import {useDispatch, useSelector } from 'react-redux'

const Hashtag = () => {

    const router = useRouter();
    const { hashtag } = router.query;

    const dispatch = useDispatch()
    const { mainPosts } = useSelector(state => state.post)


    useEffect(() => {
        function infiniteScroll() {
            let bodyHeight = document.body.clientHeight;
            let currentHeight = window.pageYOffset;
            let windowHeight = window.innerHeight;
            if(bodyHeight - 100 < currentHeight + windowHeight && infiniteLimit && !loadPostLoading) {
                // console.log('^^')
                const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id //지금 불러온 mainPosts안, 배열 마지막꺼 아이디
                dispatch({ 
                    type: LOAD_HASHTAG_REQUEST,
                    lastId: lastId,
                })
            }
            // console.log(infiniteLimit)
        }
        window.addEventListener('scroll', infiniteScroll);
        return () => {
            window.removeEventListener('scroll', infiniteScroll);
        } 
    }, [mainPosts, mainPosts.length])

    return (
        <div>
           {mainPosts ? (
                <>
                    {mainPosts.map(val => <div>nickname: {val.User.nickname}</div>)}
                </>
            ) : (
                <div>유저가 없습니다</div>
            )}
        </div>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('server side props start')

    const cookie = context.req ? context.req.headers.cookie : ''
    axios.defaults.headers.Cookie = ''
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    // console.log(context.req)
    
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    })
    
    context.store.dispatch({
        type: LOAD_HASHTAG_REQUEST,
        data: context.params.hashtag,
    })

    console.log('server side props end')
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise();
})

export default Hashtag;