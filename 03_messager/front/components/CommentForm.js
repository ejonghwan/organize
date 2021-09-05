import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../reducers/post';


const CommentForm = ({ data }) => {

    const { addCommentDone } = useSelector(state => state.post)
    const dispatch = useDispatch()

    const [comment, setComment] = useState('')
    const handleComment = useCallback(e => {
        setComment(e.target.value)
    }, [])

    const id = useSelector(state => state.user.me?.id)
    const handleSubmit = useCallback(e => {
        e.preventDefault()
        // console.log(data.User.id, comment)
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: comment, postId: data.id, userId: id }
        })
    }, [comment, id])

    useEffect(() => {
        if(addCommentDone) { setComment('') }
    }, [addCommentDone])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea placeholder="댓글입력해주세요" value={comment} onChange={handleComment}></textarea>
                <button type="submit">comment</button>
            </form>
        </div>
    );
};

export default CommentForm;