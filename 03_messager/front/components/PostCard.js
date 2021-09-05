import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ImageForm from './ImageForm.js'
import CommentForm from './CommentForm.js'
import CommentList from './CommentList.js'
import FollowButton from './FollowButton.js'
import PostCardContent from './PostCardContent.js'
import { removePost } from '../reducers/post'
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post'
import { useRouter } from 'next/router'
import Link from 'next/link'
import moment from 'moment'

moment.locale('ko')

const PostCard = ({ data }) => {
    // console.log(data.Images[0])

    const router = useRouter()
    const dispatch = useDispatch()

    const { me } = useSelector(state => state.user )
    const { retweetError } = useSelector(state => state.post )
    const id = me && me.id
    
    const like = data.Likers.find(val => val.id === id) //data (mainPosts) 에 Likers에 내 아이디가 있으면 

    // const [like, setLike] = useState(false)
    const [comment, setComment] = useState(false)
    const handleToggle = useCallback(e => {
        if(e.target.name === 'comment') setComment(prev => !prev)
    })

    useEffect(() => {
        // console.log('data: ', data)
        // console.log('id??:', id)
        // console.log('me??:', me)
    }, [])

    const onLike = useCallback(() => {
        if(!id) { alert('로그인이 필요합니다') }
        return dispatch({
            type: LIKE_POST_REQUEST,
            data: data.id,
        })
    }, [id])
    const onUnlike = useCallback(() => {
        if(!id) { alert('로그인이 필요합니다') }
        return dispatch({
            type: UNLIKE_POST_REQUEST,
            data: data.id,
        })
        // console.log(data.id) // 내가누른 게시글의 id를 보내줌
    }, [id])


    const onRemoveValue = useCallback(e => {
        if(!id) { alert('로그인이 필요합니다') }
        return dispatch(removePost(data.id))
    }, [id])

    const onRetweet = useCallback(() => {
        if(!id) { alert('로그인이 필요합니다') }
        return dispatch({
            type: RETWEET_REQUEST,
            data: data.id,
        })
    }, [id])

    const onTagetClick = (data) => () => {
        console.log(data)
        // router.push(`http://localhost:3060/user/${data}`)

    }

    // useEffect(() => { 반복문안에 이걸 넣으면 .....글만큼 리랜더링됨
    //     if(retweetError) { alert('자신의 글은 리트윗 할 수 없습니다.') }
    // }, [retweetError])
    

    return (
        <div onClick={onTagetClick(data.User.id)}>
            {data.RetweetId && data.Retweet ? (
                <div style={{backgroundColor: "#ddd"}}>
                    {data.User.nickname}님이 리트윗했습니다<br />
                    {data.Retweet.Images[0] && <ImageForm data={data.Retweet} />}
                    <FollowButton data={data.Retweet}/>
                    <div>{data.Retweet.User.nickname[0]}</div>
                    <div><Link href={`/user/${data.User.id}`}><a>{data.Retweet.User.nickname}</a></Link></div>
                    <div>{<PostCardContent data={data.Retweet.content}/>}</div>
                    <button onClick={onRetweet}>리트윗</button>
                    <div>{moment(data.createdAt).format('YYYY.MM.DD')}</div>
                </div>
            ) : (
                <div>
                    {data.Images[0] && <ImageForm data={data} />}
                    <FollowButton data={data}/>
                    <div>{data.User.nickname[0]}</div>
                    <div><Link href={`/user/${data.User.id}`}><a>{data.User.nickname}</a></Link></div>
                    <div>{<PostCardContent data={data.content}/>}</div>
                    <button onClick={onRetweet}>리트윗</button>
                    <div>{moment(data.createdAt).format('YYYY.MM.DD')}</div>
                </div>
            )}
            {!like ? (
                <button name="like" onClick={onLike} style={{color: 'black'}}>좋아요</button>
            ) : (
                <button name="like" onClick={onUnlike} style={{color: 'red'}}>좋아요 취소</button>
            )}
            <button name="comment" onClick={handleToggle}>댓글펼치기</button>
            {id && data.User.id === id ? (
                <>
                    <button>수정</button>
                    <button onClick={onRemoveValue}>삭제</button>
                </>
            ) : ( 
                <>
                    <button>신고</button>
                </>
            )}
            {comment && (
                <div>
                    <CommentForm data={data} />
                    <CommentList data={data} />
                </div>
                )}
            
        </div>
    );
};

export default PostCard;