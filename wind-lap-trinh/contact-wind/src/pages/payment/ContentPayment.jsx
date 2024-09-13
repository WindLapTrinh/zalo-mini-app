import React from "react";
import { Box, Text } from "zmp-ui";
import "../../css/payment/contentPayment.css";

const ContentPayment = ({ cartData }) => {
  const calculateTotal = () => {
    return cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ).toLocaleString("vi-VN");
  };

  return (
    <Box className="contemt-payment">
      <Box className="detail-content-payment">
        <Box className="label">
          <Text className="title-content-payment">Tổng tiền hàng:</Text>
        </Box>
        <Box className="value">
          <Text>{calculateTotal()} đ</Text>
        </Box>
      </Box>
      <Box className="detail-content-payment">
        <Box className="label">
          <Text className="title-content-payment">Phí vận chuyển:</Text>
        </Box>
        <Box className="value">
          <Text>300 đ</Text>
        </Box>
      </Box>
      <Box className="detail-content-payment">
        <Box className="label">
          <Text className="title-content-payment">Thành tiền:</Text>
        </Box>
        <Box className="value">
          <Text>{calculateTotal()} đ</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ContentPayment;
