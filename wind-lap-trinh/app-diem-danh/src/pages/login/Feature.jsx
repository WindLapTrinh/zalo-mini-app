import React from "react";
import { Box, Text, Icon } from "zmp-ui";
import { BsRobot } from "react-icons/bs";
import "../../css/login/feature.css";

const Feature = () => {
  return (
    <Box className="page-feature">
      <Box className="header-feature">
        <BsRobot />
        <Text className="title-header-feature">Tính năng nổi bật</Text>
      </Box>
      <Box className="body-feature">
        <Box className="feature-container" flex>
          <Box className="feature-box" flex="1" m={2} border>
            <img className="icon-feature" src="./images/icon/zalo.jpg" />
            <Text className="feature-title">Chat nhanh với trung tâm</Text>
          </Box>
          <Box className="feature-box" flex="1" m={2} border>
            <img
              className="icon-feature"
              src="./images/icon/payment-cart.jpg"
            />
            <Text className="feature-title">Thanh toán online</Text>
          </Box>
        </Box>
        <Box className="feature-container" flex>
          <Box className="feature-box" flex="1" m={2} border>
            <img
              className="icon-feature"
              src="./images/icon/hoc-cung-con.png"
            />
            <Text className="feature-title">Cùng con học tập</Text>
          </Box>
          <Box className="feature-box" flex="1" m={2} border>
            <img
              className="icon-feature"
              src="./images/icon/utilities.png"
            />
            <Text className="feature-title">Tiện ích cho phụ huynh</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Feature;
