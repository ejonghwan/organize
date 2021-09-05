import React from 'react'
import styles from './SerchButton.module.css'
import classnames from 'classnames'

const SerchButton = ({type, value}) => {

    return (
        <>
            {type === 'type1' && (
                <button className={classnames({[styles.serch]: true, [styles.t1]: true,})}>
                    <span>{value}</span>
                </button>
            )}

            {type === 'type2' && (
                <button className={classnames({[styles.serch]: true, [styles.t2]: true,})}>
                    <span>{value}</span>
                </button>
            )}
        </>
        
    )  
}

export default SerchButton;