import React from "react";
import { Box, Text } from "zmp-ui";
import { BsAndroid2 } from "react-icons/bs";
import "../../css/login/feature.css";

const Feature = () => {
  return (
    <Box className="page-feature">
      <Box className="header-feature">
        <BsAndroid2/>
        <Text className="title-header-feature">Chức năng tiện ích</Text>
      </Box>
      <Box className="body-feature">
        <Box className="feature-container" flex>
          <Box className="feature-box" flex="1" m={2} border>
            <img className="icon-feature" src="./images/icon/learning-path.png" />
            <Text className="feature-title">Lộ trình học tập của bạn</Text>
          </Box>
          <Box className="feature-box" flex="1" m={2} border>
            <img
              className="icon-feature"
              src="./images/icon/assessment-survey.png"
            />
            <Text className="feature-title">Khảo sát đánh giá</Text>
          </Box>
        </Box>
        <Box className="feature-container" flex>
          <Box className="feature-box" flex="1" m={2} border>
            <img
              className="icon-feature"
              src="./images/icon/register-online.png"
            />
            <Text className="feature-title">Đăng ký học viên online</Text>
          </Box>
          <Box className="feature-box" flex="1" m={2} border>
            <img
              className="icon-feature"
              src="./images/icon/payment-cart.jpg"
            />
            <Text className="feature-title">Thanh toán học phí online</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Feature;
