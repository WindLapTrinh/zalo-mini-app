import React from "react";
import { List, Icon, Box, Text } from "zmp-ui";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/payment/methodPayment.css";

const MethodPayment = () => {
  const navigate = useNavigate();
  const handleAddress = () => {
    navigate("/addressCart");
  };

  return (
      <Box className="method-payment">
        <Box className="header-method-payment">
          <FaMoneyCheckAlt className="icon-method-payment"/>
          <Text className="title-method-payment" size="large" bold mb={3}>
            Phương thức thanh toán
          </Text>
        </Box>
        <Box className="select-method" mt={2}>
          <Text className="item-method-payment">
                Thanh toán khi nhận hàng
          </Text>
        </Box>
      </Box>
  );
};

export default MethodPayment;
