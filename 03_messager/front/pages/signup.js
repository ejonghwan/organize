import React, { useCallback, useEffect, useState } from 'react';
import useInput from '../components/hooks/useInput.js';
import Layout from '../components/Layout.js'
import { SIGNUP_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user.js';

import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import axios from 'axios'

import { END } from 'redux-saga'
import wrapper from '../store/configureStore'


const Signup = () => {

    const dispatch = useDispatch()
    const { signupLoading, signupDone, signupError, initialState, me } = useSelector(state => state.user)

    const [email, handleEmailChange] = useInput('');
    const [nickname, handleNicknameChange] = useInput('');
    const [password, handlePasswordChange] = useInput('');
    const [passwordCheck, setPasswordCheckChange] = useState('');
    const [passwordErr, setPasswordErr] = useState(false);
    const [terms, setTerms] = useState(false)
    

    const handlePasswordErr = useCallback(e => {
        setPasswordCheckChange(e.target.value)
        setPasswordErr(e.target.value !== password)
    }, [password]) 

    const handleChecked = useCallback(e => {
        setTerms(e.target.checked)
        // console.log(e.target.checked)
    }, [])


    const handleSubmit = useCallback(e => {
        e.preventDefault()
        // console.log(email, password, nickname)
        dispatch({
            type: SIGNUP_REQUEST,
            data: { email, password, nickname }
        })
    }, [email, password, nickname])

    useEffect(() => {
        if(me && me.id) {
            //  Router.replace('/') //replace는 뒤로가기도 안됨 
        }
     }, [me && me.id])

    useEffect(() => {
       if(signupDone) {
            // Router.replace('/')
       }
    }, [signupDone])

    useEffect(() => {
        if(signupError) {
             alert(signupError)
        }
     }, [signupError])



    return (
        <Layout>
            singup
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">email</label><br />
                    <input type="text" type="email" onChange={handleEmailChange} value={email} required />
                </div>
                <div>
                    <label htmlFor="nickname">nickname</label><br />
                    <input type="text" onChange={handleNicknameChange} value={nickname} required />
                </div>
                <div>
                    <label htmlFor="password">password</label><br />
                    <input type="password" onChange={handlePasswordChange} value={password} required />
                </div>
                <div>
                    <label htmlFor="passwordCheck">passwordCheck</label><br />
                    <input type="password" onChange={handlePasswordErr} value={passwordCheck} required />
                    {passwordErr && <div>not password</div>}
                </div>
                <div>
                    <input type="checkbox" checked={terms} onChange={handleChecked}/>
                    {!terms && <div>동의해주세요</div>}
                </div>

                {terms ? <button type="submit">submit</button> : <button type="submit">not submit</button>}
            </form>
        </Layout>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('server side props start')

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


export default Signup;