import React, { useState } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'

// import { initalState } from '../reducers/index'
import { useSelector } from 'react-redux'

import styles from "./Layout.module.css"
import UserProfile from './UserProfile.js'
import LoginForm from './Loginform.js'
import Headers from './Headers.js'



const Layout = ({ children }) => {

    const { me } = useSelector(state => state.user)
    
    return (
        <div>
            <Headers />
            <div className={styles.contents}>
                {/* <div>
                    <a href="https://www.naver.com" target="_blank" rel="noreferrer noopener">naver test</a>
                </div> */}
                <div className={styles.mainView}>
                    {children}
                </div>
                <div>
                    {me ? <UserProfile /> : <LoginForm />}
                </div>
            </div>
            
        </div>
    );
};


// Layout.propTypes = {
//     children: PropTypes.node.isRequired,   
// }


export default Layout;