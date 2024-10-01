import React, { useState } from "react";
import { Box, Text } from "zmp-ui";
import CustomHeader from "../shared/pages/CustomHeader";
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../css/profile/home.css';

const images = [
  './images/member/anh-1.png',
  './images/member/anh-2.png',
];

const MemberRewards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.realIndex);
    };

    return (
        <Box className="member-rewards-container">
            <CustomHeader title={"YOUR NIKE MEMBER REWARDS"} showBackIcon={true} />
            <Box className="image-container">
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    onSlideChange={handleSlideChange}
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <img src={src} alt={`Customer Reward ${index + 1}`} className="reward-image" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Text className="image-counter">0{`${currentIndex + 1}/0${images.length}`}</Text>
        </Box>
    );
};

export default MemberRewards;
