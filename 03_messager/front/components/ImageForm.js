import React, { useState } from 'react';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import { createGlobalStyle } from 'styled-components'




const ImageForm = ({ data }) => {
    
    const Global = createGlobalStyle`
    .swiper-container {
        border: 1px solid orange;
        width:320px;
        height: 120px;
    }

    .swiper-wrapper {
        display: flex;
        
    }

    .swiper-slide {
        flex: 1 1 auto;
        width: 320px;
        
    }
       
    `

    return (
        <div>
            <Global />
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                >
                {data.Images.map((item, idx) => {
                    return (
                        <SwiperSlide key={idx}>
                            <img src={`http://localhost:3065/${item.src}`} alt="" /> {/* 서버에서 받으려면 서버쪽 주소 */}
                        </SwiperSlide>
                    )
                })} 
            </Swiper>

        </div>
    );
};

export default ImageForm;