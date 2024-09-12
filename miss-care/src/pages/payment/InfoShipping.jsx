import React from "react";
import { Box, Text } from "zmp-ui";
import "../../css/payment/infoShipping.css";

const InfoShipping = () => {

  return (
    <Box className="contemt-payment">
        <Box className="detail-content-payment">
          <Box className="label">
            <Text className="title-content-payment">Mã đơn hàng:</Text>
          </Box>
          <Box className="value">
            <Text>TOMO26567</Text>
          </Box>
        </Box>
      <Box className="detail-content-payment">
        <Box className="label">
          <Text className="title-content-payment">Thời gian đặt hàng:</Text>
        </Box>
        <Box className="value">
          <Text>15-08-2024 09:55</Text>
        </Box>
      </Box>
      <Box className="detail-content-payment">
        <Box className="label">
          <Text className="title-content-payment">Trạng thái đơn hàng</Text>
        </Box>
        <Box className="value">
          <Text>Đang xử lý</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoShipping;
