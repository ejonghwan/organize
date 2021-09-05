import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'

const PostCardContent = ({ data }) => {
    return (
        <div>
            {data.split(/(#[^\s#]+)/g).map((val, idx) => {
                if(val.match(/(#[^\s#]+)/)) {
                    return <Link href={`/hashtag/${val.slice(1)}`} key={idx}><a>{val}</a></Link>
                }
                return val
            })}
        </div>
    );
};

PostCardContent.propTypes = { data: PropTypes.string.isRequired }

export default PostCardContent;