

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login_action, logout_action, logout_request_action}from '../reducers/user.js'

import NicknameEditForm from './NicknameEditForm'

const UserProfile = ({ setIsLoggedIn }) => {

    const { me } = useSelector(state => state.user) 
    // console.log('me ?? ', me)
    const dispatch = useDispatch()
    const handleLogout = useCallback(e => {
        e.preventDefault();
        // setIsLoggedIn(false)
        dispatch(logout_request_action())
    }, [])

    return (
        <div>
           
                <div>
                <span>avatar</span><br />
                <span>userName</span>
            </div>
            <ul>
                <li>post: <span>{me.Posts.length}</span></li>
                <li>followings: <span>{me.Followings.length}</span></li>
                <li>followers: <span>{me.Followers.length}</span></li>
            </ul>
            <button onClick={handleLogout}>logout</button>
             <NicknameEditForm />
        </div>
    );
};

export default UserProfile;