import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Text, Icon } from "zmp-ui";
import { CiWallet } from "react-icons/ci";
import { BsCoin } from "react-icons/bs";
import { BsWallet2 } from "react-icons/bs";
import { BsTicketPerforated } from "react-icons/bs";
import { BsTabletLandscape } from "react-icons/bs";

import "../../css/user/home.css";

const Extension = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Giả sử các chức năng của bạn có tên cụ thể và có thêm mô tả
  const functions = [
    { id: 1, title: "Ví WindPay", icon: <BsWallet2 />, description: "Giảm đến 40.000 Đ." },
    { id: 2, title: "Wind Xu", icon: <BsCoin />, description: "Nhấn để nhận Xu mỗi ngày!" },
    { id: 3, title: "SPayLater", icon: <BsTabletLandscape />, description: "Kích hoạt ngay." },
    { id: 4, title: "Kho Voucher", icon: <BsTicketPerforated />, description: "50 + Voucher." }
  ];

  return (
    <Box className="page-extension-user">
      <Box className="box-header-extension">
        <CiWallet className="icon-extension" />
        <Text className="text-header-sale">Tiện ích của tôi</Text>
      </Box>

      <Box className="box-body-extension">
        {functions.map((func, index) => (
          <Box
            key={func.id}
            className="item-func-extension"
          >
            {/* Kiểm tra và áp dụng các class khác nhau dựa trên title */}
            <Box
              className={
                func.title === "Wind Xu"? "icon-func-coin": "icon-func-extension"
              }
            >
              {func.icon}
            </Box>
            <Box className="func-text">
              <Text className="title-func-extension">{func.title}</Text>
              <Text
                className={
                  func.title === "Wind Xu" ? "description-func-coin" 
                                           : func.title === "SPayLater"
                                           ? "description-func-spay"
                                           : "description-func-extension"
                }
              >
                {func.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Extension;
