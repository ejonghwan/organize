import React, { useState, useCallback } from 'react'
import SearchButton from '../button/SerchButton'
import styles from './Input.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router' 
import wrapper from '../../../store/configureStore'

const SerchForm = ({width}) => {

    const { mainPosts } = useSelector(state => state.post)
    const router = useRouter()
    const [search, setSearch] = useState('')

    const onSearchClick = useCallback(data => e => {
        console.log(data)
        router.push(`/hashtag/${data}`)
    }, [])

    const onChangeSearch = useCallback(e => {
        const { target: { value, name } } = e;
        setSearch(value)
    }, [])

    return (
        <div style={{width: width + 'px'}} className={styles.serch_form}>
            <input type="text" value={search} onChange={onChangeSearch}/>
            <div className={styles.serch_btn}>
                <SearchButton type={"serch_type2"} value={"검색"} />
                <button type="button" onClick={onSearchClick(search)} >search</button>
            </div>
        </div>
    )
}

// export const getServerSideProps = 

export default SerchForm;