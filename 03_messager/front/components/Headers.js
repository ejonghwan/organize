import React from 'react';
import Link from 'next/link'
import styles from './Headers.module.css'

import DefaultButton from '../components/smallPieces/button/DefaultButton'
import SerchForm from './smallPieces/input/SearchForm';

const Headers = () => {
    return (
        <header className={styles.header}>
            <div>logo</div>
            <Link href="/"><a>home</a></Link>
            <Link href="/profile"><a>profile</a></Link>
            <Link href="/signup"><a>signup</a></Link>
            <SerchForm width={200} />
        </header>
    )
}

export default Headers;