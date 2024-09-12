import React from "react";
import { List, Icon, Box, Text } from "zmp-ui";
import { FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/payment/infoPayment.css";

const InfoPayment = () => {
  const navigate = useNavigate();
  const handleAddress = () => {
    navigate("/addressCart");
  };

  return (
      <Box className="info-payment">
        <Box className="header-info-payment">
          <FaTruck className="icon-info-payment"/>
          <Text className="title-info-payment" size="large" bold mb={3}>
            Thông tin vận chuyển
          </Text>
        </Box>
        <Box className="info-shipping" mt={2}>
          <Text className="detail-shipping-payment">
            Chưa có thông tin vận chuyển
          </Text>
        </Box>
      </Box>
  );
};

export default InfoPayment;
