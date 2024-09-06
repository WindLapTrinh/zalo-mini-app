import React, { useEffect, useRef } from "react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import bannerOne from "/images/banner/banner-one.jpg";
import bannerTwo from "/images/banner/banner-two.jpg";
import banner3 from "/images/banner/banner-3.jpg";
import "../../css/detailhome/slider.css";

SwiperCore.use([EffectCoverflow, Pagination]);

const slide_img = [bannerOne, bannerTwo, banner3 ];

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
