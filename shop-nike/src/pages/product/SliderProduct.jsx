import React from "react";
import { Swiper, Box } from "zmp-ui";
import "../../css/product/productDetail.css";

const SliderProduct = () => {
  return (
    <Box className="product-image">
        <Swiper className="product-item">
          
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/product/product-8.jpg"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/product/product-9.jpg"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/product/product-10.jpg"
              alt="slide-3"
            />
          </Swiper.Slide>

        </Swiper>
      </Box>
  );
};

export default SliderProduct;
