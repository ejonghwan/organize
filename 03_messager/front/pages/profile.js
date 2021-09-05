import React, {  useState ,useEffect, useCallback } from 'react';
import Layout from '../components/Layout.js'
import NicknameEditForm from '../components/NicknameEditForm.js'
import FollowList from '../components/FollowList.js'

import Router from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user'

import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga' 

import useSWR from 'swr'; 
const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data)

const Profile = () => {

    // const followers = [{nick:'jj'}, {nick:'jj1'}, {nick:'jj2'}]
    // const followings = [{nick:'hh'}, {nick:'hh'}, {nick:'hh'}]

    const dispatch = useDispatch()
    const { me } = useSelector(state => state.user)
    const [ followersLimit, setFollowersLimit ] = useState(3)
    const [ followingsLimit, setFollowingsLimit ] = useState(3)
    
    //swr. useSWR훅스로 가져온 데이터가 data에 담김
    const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher)
    const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher)

    const onFollowersViewmore = useCallback(() => {
        setFollowersLimit(prev => prev + 3)
    }, [])

    const onFollowingsViewmore = useCallback(() => {
        setFollowingsLimit(prev => prev + 3)
    }, [])

    // useEffect(() => { //swr로 변경
    //     dispatch({
    //         type: LOAD_FOLLOWERS_REQUEST,
    //     })

    //     dispatch({
    //         type: LOAD_FOLLOWINGS_REQUEST,
    //     })
    // }, [])


    useEffect(() => {
        if(!(me)) {
            Router.push('/')
        }
    }, [me])
    
    // useEffect(() => {
    //     if(!(me && me.id)) {
    //         Router.push('/')
    //     }
    // }, [me && me.id])


    if(!me) {
        return '내 정보 로딩...';
    };

    // 중요 훅스는 훅스실행 횟수가 달라지면 오류를 뱉음. 리턴문은 훅스보다 위에 있을 수 없음
    if(followerError || followingError) {
        console.error(followerError || followingError)
        return '팔로잉/팔로워 로딩 중 에러 발생'
    }

   

    return (
        <div>
            <Layout>
                <NicknameEditForm />
                {/* <FollowList header="followings" data={me.Followings} /> */}
                {/* <FollowList header="followers" data={me.Followers} /> */}
                <FollowList header="followings" data={followingsData} viewMore={onFollowingsViewmore} loading={!followingsData && !followingError} /> 
                <FollowList header="followers" data={followersData} viewMore={onFollowersViewmore} loading={!followersData && !followerError} />
            </Layout>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('server side props start')
    // console.log('콘텍스트야!:', context)

    const cookie = context.req ? context.req.headers.cookie : ''; 
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie; 
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    })
  
    console.log('server side props end')
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise();
})

export default Profile;