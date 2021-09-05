import React, { useState, useCallback } from 'react';
import wrapper from '../../store/configureStore'
import { END } from 'redux-saga'
import axios from 'axios'

import { useRouter } from 'next/router'
import Signup from '../signup'

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user'


const test1 = () => {

    const router = useRouter();
    const { test1 } = router.query
    console.log(router.query)


    // const useTab = (initial, target) => {
    //     const [] = useState(initial)
    // }

    // const [ toggle, setToggle ] = useState(false)
    // const onToggleClick = useCallback( e => {
    //     setToggle(prev => !prev)
    // }, [])



    

    const tabData = [
        { tit: '탭1', conts: '탭1 메뉴' },
        { tit: '탭2', conts: '탭2 메뉴' },
        { tit: '탭3', conts: <Signup /> },
    ]
    const [num, setNum] = useState(0)
    const [togglesss, setTogglesss] = useState(false) 

    const onToggleClick = e => {
        setTogglesss(prev => !prev)
    }

    const onTab = (n) => useCallback((e) => {
        setNum(n)
        onToggleClick()
        console.log(e.target)
    }, [])

    return (
        <div>
            test?? {test1}<br />

            {tabData.map((val, idx) => <button className={togglesss ? 'on': ''} key={idx} onClick={onTab(idx)}>{val.tit}</button>)}
            <div>{tabData[num].conts}</div>
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


export default test1;