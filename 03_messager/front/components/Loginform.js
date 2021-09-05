import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { login_action, logout_action, login_request_action }from '../reducers/user.js'

const Loginform = () => {

    const dispatch = useDispatch()
    const { loginLoading, loginError } = useSelector(state => state.user)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = useCallback(e => {
            const { target: {name, value} } = e;
            switch(name) {
                case "user_id": 
                    setEmail(value);
                    break;
    
                case "user_password": 
                    setPassword(value);
                    break;
    
                default: false
            }
        }, [])

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        // setIsLoggedIn(true)
        dispatch(login_request_action({email, password}))
        console.log(email, password)

    }, [email, password])

    
    useEffect(() => {
        if(loginError) {
            alert(loginError)
        }
    }, [loginError])


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="user_id">id</label><br />
                <input 
                    name="user_id" 
                    type="email"
                    value={email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="user_password">password</label><br />
                <input 
                    type="password"
                    name="user_password" 
                    value={password} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            
            <button type="submit">login</button>
            <Link href="/signup"><a>singup</a></Link>
            
        </form>
    );
};

export default Loginform;