import React, { useEffect } from 'react';

const CommentList = ({ data }) => {
   

    
    return (
        <div>
            <div>{data.Comments.length}κ°μ λκΈ</div>
            {data.Comments.map((item, idx) => {
                return (
                    <div key={idx}>
                        <div><b>{item.User.nickname[0]}</b></div>
                        <div>id {item.User.nickname}</div>
                        <div>con {item.content}</div>
                    </div>
                ) 
            })}
        </div>
    );
};

export default CommentList;