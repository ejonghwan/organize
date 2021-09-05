import React from 'react'
import styles from './BoxButton.module.css'
import classnames from 'classnames'

const BoxButton = ({type, value}) => {
    return (
        <>
            {type === 'type1' && (
                <button className={classnames({[styles.btn]: true, [styles.t1]: true,})}>
                    <span>{value}</span>
                </button>
            )}

            {type === 'type2' && (
                <button className={classnames({[styles.btn]: true, [styles.t2]: true,})}>
                    <span>{value}</span>
                </button>
            )}

            {type === 'type3' && (
                <button className={classnames({[styles.btn]: true, [styles.t3]: true,})}>
                    <span>{value}</span>
                </button>
            )}

            {type === 'type4' && (
                <button className={classnames({[styles.btn]: true, [styles.t4]: true,})}>
                    <span>{value}</span>
                </button>
            )}
        </>
    )  
}

export default BoxButton;