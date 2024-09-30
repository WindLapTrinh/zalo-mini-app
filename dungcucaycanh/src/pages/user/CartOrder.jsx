import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Text, Icon } from "zmp-ui";
import { CiGift } from "react-icons/ci";
import { CiCreditCard2 } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CiMemoPad } from "react-icons/ci";
import "../../css/user/home.css";

const FlashSale = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {keyTab } = location.state || {};

  // Giả sử các chức năng của bạn có tên cụ thể
  const functions = [
    { id: 1, title: "Chờ xác nhận", icon: <CiCreditCard2 /> },
    { id: 2, title: "Chờ lấy hàng", icon: <CiGift /> },
    { id: 3, title: "Chờ giao hàng", icon: <CiDeliveryTruck /> },
    { id: 4, title: "Đánh giá", icon: <CiStar /> },
  ];

  const handleItemClick = () => {
    navigate("/evaluate", {state:{keyTab}})
  }

  return (
    <Box className="page-user-cart">
      <Box className="box-user-cart">
        <Box className="user-cart-left">
          <CiMemoPad className="icon-cart-left"/>
          <Text className="text-cart-left">Đơn mua</Text>
        </Box>
        <Box className="user-cart-right">
          <Text className="text-cart-right">Xem lịch sử mua hàng</Text>
          <Icon className="icon-cart-right" icon="zi-chevron-right" />
        </Box>
      </Box>

      <Box className="box-func-cart">
        {functions.map((func) => (
          <Box
            key={func.id}
            className="item-func-cart"
            onClick={func.title == "Đánh giá" ? handleItemClick :""}
          >
            <Box className="icon-func-cart">{func.icon}</Box>
            <Text className="title-func-cart">{func.title}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FlashSale;
