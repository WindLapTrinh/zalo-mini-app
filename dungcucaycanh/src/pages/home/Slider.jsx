import React, { useEffect, useRef } from "react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../../css/detailhome/slider.css";

import bannerOne from "/images/banner/banner-1.png";
import bannerTwo from "/images/banner/banner-2.png";
import banner3 from "/images/banner/banner-3.png";
import banner4 from "/images/banner/banner-4.png";
import banner5 from "/images/banner/banner-5.png";

SwiperCore.use([EffectCoverflow, Pagination]);

const slide_img = [bannerOne, banner4, banner5, banner3, bannerTwo];

const Slider = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        const swiper = swiperRef.current.swiper;
        swiper.slideNext(); 
      }
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="main-swiper">
      <Swiper
        effect={"slide"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        pagination={true}
        className="mySwiper"
        loop={true}
        initialSlide={1}
        ref={swiperRef}
      >
        {slide_img.map((img, i) => (
          <SwiperSlide key={i}>
            <img className="image-slider" src={img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
