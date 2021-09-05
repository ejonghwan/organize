

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../reducers/post'

const PostForm = () => {

    const { addPostDone, imagePaths } = useSelector(state => state.post);
    const dispatch = useDispatch();


    const [post, setPost] = useState('')
    const onChangePost = useCallback(e => {
        setPost(e.target.value);
    }, []);

    const imgUpload = useRef();
    const onImgUpload = useCallback(e => {
        imgUpload.current.click();
    }, [imgUpload.current]);

    


    const onChangeSubmit = useCallback(e => {
        e.preventDefault();
        // dispatch(addPost(post));

        if(!post || !post.trim()) {
            return alert('게시글 작성해주세요')
        }

        const formData = new FormData();
        imagePaths.forEach(path => {
            formData.append('image', path); //array는 req.files. text는 req.body.image.
        });
        formData.append('content', post); //req.body.content

        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData, //여긴 이미지 없는 경우에 json으로 전달해줘도됨 {imagePaths, content: post} 
        })

    }, [post, imagePaths]); 




    const onChangeImages = useCallback((e) => {
        console.log('images: ', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (file) => { //e.target.files 가 유사배열이라 array에 call
            imageFormData.append('image', file); //append에 키: 'image'  값: file. 서버에 upload.array('image')랑 일치하게끔 해야됨.
        });

        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })

    }, [])




    const onImageRemove = useCallback((idx) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: idx,
        })
    }, [])




    useEffect(() => {
        if(addPostDone) setPost('');
    }, [addPostDone]);



    return (
        <div>
            postFrom
            <form onSubmit={onChangeSubmit} encType="multipart/form-data">
                <textarea placeholder="ing..." value={post} onChange={onChangePost}></textarea>   
                <button type="submit">submit</button>
                
                <input type="file" name="image" hidden multiple ref={imgUpload} onChange={onChangeImages} />
                <a href="#" onClick={onImgUpload}>file upload</a>
            </form>
            <div>
                {imagePaths.map((val, idx) => (
                    <div key={val}>
                        <img src={`http://localhost:3065/${val}`} style={{height:"200px"}} alt={val} />
                        <button onClick={onImageRemove(idx)}>제거</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostForm;