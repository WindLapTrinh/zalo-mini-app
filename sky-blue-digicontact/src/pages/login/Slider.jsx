import React, { useEffect, useRef } from "react";
import {Page, Box, Button, Text, Icon, Swiper} from "zmp-ui";

import banner1 from "/images/banner/ileader_1.jpg";
import banner2 from "/images/banner/ileader_2.png";
import banner3 from "/images/banner/ileader-5.png";

import "../../css/login/slider.css";


const slide_img = [banner1, banner2, banner3];

const SliderLogin = () => {

  return (
    <Box className="main-swiper">
      <Swiper
        autoplay = {true}
        duration = {3000}
      >
        {slide_img.map((img, i) => (
          <Swiper.Slide key={i}>
            <img className="image-slider" src={img} alt="" />
          </Swiper.Slide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SliderLogin;
