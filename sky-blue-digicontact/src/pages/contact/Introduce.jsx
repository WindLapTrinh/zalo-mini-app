import React, { useState, useEffect } from "react";
import { Box, Text } from "zmp-ui";
import { IoStorefrontOutline } from "react-icons/io5";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaConnectdevelop } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import { BsMortarboard } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { PiStudentLight } from "react-icons/pi";
const Introduce = () => {
  return (
    <Box>
      <Box className="image-introduce-contact">
        <img
          className="slide-img"
          src="images/banner/ileader-6.png"
          alt="banner-contact"
        />
      </Box>
      <Text className="desc-mini-app">
        <IoStorefrontOutline className="icon-desc-app" />
        <span className="name-application">Mini App</span> 
        {/* và
        <span className="name-application"> Sofware </span> */}
        <img className="image-fouder-contact" src="/images/icon/logo-tim.png" />
        <span className="content-desc-app">
          là giải pháp quản lý đào tạo toàn diện, hiện đại, ứng dụng công nghệ
          mới nhất giúp trung tâm đào tạo, trường học vận hành hệ thống chuyên
          nghiệp và tối ưu, do SLK Solutions phát triển.
        </span>
      </Text>
      <Box className="fouder-contact">
        <BsBoxSeamFill className="icon-contact" />
        <span className="name-application">Tiện ích</span>
      </Box>
      <Box className="overview-app">
        <Box className="detail-overview-app">
            <Box className="item-item-overview">
              <FaConnectdevelop className="icon-contact"/>
              <p className="info-item-overview">Kết nối học viên - Phụ huynh - Nhà trường</p>
            </Box>
            <Box className="item-item-overview">
              <RiMailSendLine className="icon-contact"/>
              <p className="info-item-overview">Xem thông báo của trường, lịch học trung tâm</p>
            </Box>
            <Box className="item-item-overview">
              <BsMortarboard className="icon-contact"/>
              <p className="info-item-overview">Xem bảng điểm, điểm danh, kết quả học tập</p>
            </Box>
            <Box className="item-item-overview">
              <VscFeedback className="icon-contact"/>
              <p className="info-item-overview">Giửi feedback liên lạc đến trung tâm</p>
            </Box>
            <Box className="item-item-overview">
              <BsReverseLayoutTextWindowReverse className="icon-contact"/>
              <p className="info-item-overview">Khảo sát đánh giá chất lượng khóa học</p>
            </Box>
            <Box className="item-item-overview">
              <PiStudentLight className="icon-contact"/>
              <p className="info-item-overview">Theo dõi lộ trình học tập của học viên</p>
            </Box>
        </Box>
      </Box>
      <Box className="sofware-ileader"></Box>
    </Box>
  );
};

export default Introduce;
