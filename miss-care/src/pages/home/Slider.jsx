import React, { useEffect, useRef } from "react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../../css/detailhome/slider.css";

import bannerOne from "/images/banner/anh-1.jpg";
import bannerTwo from "/images/banner/anh-2.jpg";
import banner3 from "/images/banner/anh-3.jpg";
import banner4 from "/images/banner/anh-4.jpg";
import banner5 from "/images/banner/anh-5.jpg";

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
