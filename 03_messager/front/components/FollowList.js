
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { UNFOLLOW_REQUEST, REMOVE_FOLLOW_REQUEST } from '../reducers/user';

const FollowingList = ({ header, data, viewMore, loading }) => {

    const dispatch = useDispatch();

    const followCancelClick = (data) => () => {
        if(header === "followings") {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data,
            })
        } else if(header === "followers") {
            dispatch({
                type: REMOVE_FOLLOW_REQUEST,
                data,
            })
        }
    }

    

    return (
        <div>
            {header}<br />
            <div>
                {data && data.map( item => {
                    // console.log('item: ', item)
                    return (
                        <li>
                            id: {item.id}<br />
                            nickname: {item.nickname}<br />
                            <button onClick={followCancelClick(item.id)}>삭제</button>
                        </li>
                    )
                })}
            </div>
            <button type="button" onClick={viewMore}>더보기</button>
        </div>
    );
};

export default FollowingList;