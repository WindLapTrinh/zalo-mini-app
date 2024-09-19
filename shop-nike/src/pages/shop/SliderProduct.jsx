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
              src="/images/product/product-14.jpg"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/product/product-15.jpg"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/product/product-17.jpg"
              alt="slide-3"
            />
          </Swiper.Slide>

        </Swiper>
      </Box>
  );
};

export default SliderProduct;
