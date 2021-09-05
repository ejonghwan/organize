
import React, {useState, useEffect } from 'react';
import Layout from '../components/Layout.js'
import PostForm from '../components/PostForm.js'
import PostCard from '../components/PostCard.js'

import { useSelector, useDispatch } from 'react-redux'
import { LOAD_POSTS_REQUEST } from '../reducers/post.js';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user.js';

import wrapper from '../store/configureStore'
import { END } from 'redux-saga' 
import axios from 'axios';

const index = () => {

    const dispatch = useDispatch();
    const { loginDone, me } = useSelector(state => state.user)
    const { mainPosts, infiniteLimit, loadPostLoading, retweetError } = useSelector(state => state.post)
    const { loginLoading, logoutLoading } = useSelector(state => state.user)
    
    // console.log(me)
    useEffect(() => { //얘네 서버사이드로 
        // dispatch({
        //     type: LOAD_MY_INFO_REQUEST
        // })
        // if(infiniteLimit) {
        //     dispatch({ 
        //         type: LOAD_POSTS_REQUEST 
        //     })
        // }
    }, [])

    

    useEffect(() => {
        // 스크롤 전체값 -500 < 현재 화면의 스크롤 탑값 + 현재 화면의 높이값 
        function infiniteScroll() {
            let bodyHeight = document.body.clientHeight;
            let currentHeight = window.pageYOffset;
            let windowHeight = window.innerHeight;
            if(bodyHeight - 100 < currentHeight + windowHeight && infiniteLimit && !loadPostLoading) {
                // console.log('^^')
                const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id //지금 불러온 mainPosts안, 배열 마지막꺼 아이디
                dispatch({ 
                    type: LOAD_POSTS_REQUEST,
                    lastId: lastId,
                })
            }
            // console.log(infiniteLimit)
        }
        window.addEventListener('scroll', infiniteScroll);
        return () => {
            window.removeEventListener('scroll', infiniteScroll);
        } 
    }, [infiniteLimit, loadPostLoading, mainPosts])
    


    useEffect(() => { 
        if(retweetError) { alert('자신의 글은 리트윗 할 수 없습니다.') }
    }, [retweetError])



    return (
        <div>
            <Layout>
                {me && <PostForm /> }
                {loginLoading || logoutLoading? (
                    <div>...loading</div>
                ) : (
                    <div>
                    {mainPosts.map(data => <PostCard key={data.id} data={data} />)}
                    {console.log('asd')}
                    </div>
                )}
            </Layout>
        </div>
    );
};


/* 
    ## ssr   넥스트에서 제공하는 애들은 리덕스랑 사용할 때 문제가 있어서 next-redux-wrapper에서 제공하는 메서드사용
    index.getInitialProps
    getServerSideProps 
*/


// cors 문제. 브라우저에서 쿠키를 보낼 때 브라우저는 자동으로 보내줘서 서버에서 처리를 해줬는데 아래소스는 프론트서버에서 보내는거라 여기서도 처리를 해줘야함 
// 아래 코드가 화면을 그리기전에 프론트서버에서 먼저 실행됨 home=> 브라우저  getServerSideProps=>프론트서버
// 리덕스에서 아래 dispatch를 스토어로 보내서 실행한 결과를 리듀서에 하이드레이트로 보내줌
export const getServerSideProps = wrapper.getServerSideProps( async context => { // 브라우저 개입x 프론트서버o
    // console.log('context: ', context.req) //
    
    const cookie = context.req ? context.req.headers.cookie : ''; //서버에서 실행되면 context.req안에 header가 들어있다     
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) { //요청했을 때 쿠키가 있을 때만 쿠키를 넣어주고 아닐 땐 비워줌. 이유는 쿠키가 해더에 저장되면 내가 로그아웃하고 다른사람이 로그인할때 내 정보로 로그인이 됨. 쿠키는 서버에 저장이 돼 버려서. 
        axios.defaults.headers.Cookie = cookie; //위에 해더정보에 쿠키가 있으면 가져와서 axios해더 쿠키에 넣어줌
    }

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    })
    context.store.dispatch({ 
        type: LOAD_POSTS_REQUEST 
    })


    //위에 dispatch만 하면 request만 되고 서버에서 바로 클라이언트로 뿌려줘서 success가 안됨 
    context.store.dispatch(END) //얘네 둘은 그냥 사용방법. 두개 추가하면 success를 기다렸다가 서버에서 보내줌
    await context.store.sagaTask.toPromise() //store에서 sagaTask 등록해둔거 
});



export default index;