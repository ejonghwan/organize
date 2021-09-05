


import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux' 
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';


const NicknameEditForm = () => {

    const dispatch = useDispatch()
    const { me } = useSelector(state => state.user)

    const [nickname, setNickname] = useState(me?.nickname || '')
    const onChangeNickname = useCallback(e => {
        setNickname(e.target.value)
    }, [nickname])

    const nicknameEditSubmit = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        })   
    }, [nickname])

    return (
        <form onSubmit={nicknameEditSubmit}>
            <label htmlFor="nicknameEdit">nickname</label>
            <input name="nicknameEdit" value={nickname} onChange={onChangeNickname}/>
            <button type="submit">edit</button>
        </form>
    );
};

export default NicknameEditForm;