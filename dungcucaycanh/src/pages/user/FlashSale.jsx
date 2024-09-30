import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Text, List, Icon } from "zmp-ui";
import "../../css/user/home.css"
const FlashSale = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Giả sử các chức năng của bạn có tên cụ thể
  const functions = [
    { id: 1, title: "Trang Chính", image: "./images/icon/icon-big-sale.png" },
    { id: 2, title: "Săn Sale", image: "./images/icon/icon-sale-time.png" },
    { id: 3, title: "Wind Video", image: "./images/icon/icon-video-sale.png" },
    { id: 4, title: "Wind Live", image: "./images/icon/icon-live-show.png" },
  ];

  return (
    <Box className="page-flash-sale">
      <Box className="box-header-sale">
        <img className="img-sale" src="./images/icon/icon-sale.png" alt="Flash Sale" />
        <Text className="text-header-sale">9.9 Ngày Siêu Mua Sắm</Text>
        <span className="percent-sale">50%</span>
      </Box>

      <Box className="box-body-sale">
        {functions.map(func => (
          <Box
            key={func.id}
            className="item-func-sale"
          >
            <img className="img-func-sale" src={func.image} alt="Icon Sale" />
            <Text className="title-func-sale">{func.title}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FlashSale;
