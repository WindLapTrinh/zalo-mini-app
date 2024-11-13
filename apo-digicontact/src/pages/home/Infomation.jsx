import React, { useEffect, useRef } from "react";
import { Page, Box, Button, Text, Icon, Swiper } from "zmp-ui";
import { BsShop } from "react-icons/bs";
import "../../css/home/infomation.css";

const Infomation = () => {
  return (
    <Box mt={2} className="page-infomation-home">
      <Box className="header-infomation-home">
        <BsShop className="icon-infomation-home" />
        <Text.Title className="title-infomation-home">
        Anh ngữ Quốc tế APO
        </Text.Title>
      </Box>
      <Text.Title className="description-infomation-home">
        Anh ngữ APO cam kết IELTS 5.0. Lộ trình học tập:
        Starters-Movers-Flyers-KET-PET-IELTS Tiếng Anh chuẩn Cambridge, bệ phóng
        vững chắc vươn ra toàn cầu.
      </Text.Title>
    </Box>
  );
};

export default Infomation;
