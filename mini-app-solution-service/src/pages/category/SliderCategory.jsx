import React from "react";
import { Swiper, Box } from "zmp-ui";
import "../../css/detailhome/product/productDetail.css";

const SliderCategory = () => {
  return (
    <Box className="product-image">
        <Swiper className="product-item">
          
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/product/product-1.jpg"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/product/product-2.jpg"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/product-3.jpg"
              alt="slide-3"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/product/product-4.jpg"
              alt="slide-3"
            />
          </Swiper.Slide>
        </Swiper>
      </Box>
  );
};

export default SliderCategory;
