import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ data }) => {


    const [follow, setFollow] = useState(false)
    // console.log(data)
    const dispatch = useDispatch()
    const { me } = useSelector(state => state.user)

    // 내 Followings에 있는 id랑 게시물 작성자 id랑 같으면 넣어줌 
    const isFollowing = me && me.Followings.find(val => val.id === data.User.id);

    
    const followClick = e => {
        e.preventDefault()
        
        if(isFollowing) {
            // setFollow(false)
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: data.User.id
            })
        } else {
            // setFollow(true)
            dispatch({
                type: FOLLOW_REQUEST,
                data: data.User.id
            })
        }
    }

    if(me && me.id === data.User.id) {
        return null
    }
  


    return (
        <div>
            {me && <>
                {isFollowing ? (
                    <div><a href="" onClick={followClick}>unfollow</a></div>
                ): (
                    <div><a href="" onClick={followClick}>follow</a></div>
                )}
            </>
            }
           
        </div>
    );
};

export default FollowButton;