import React from "react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";

import "../styles/orderCart.css";

const OrderCart = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/")
    }

  return (
    <Box className="order-cart">
      <img className="image-order-cart" src="https://www.gticanada.com/wp-content/uploads/2021/11/nike.gif" alt="Order cart" />
      <Box className="notify-order-cart">
        <Text className="text-notify-order">Bạn chưa có sản phẩm nào trong giỏ hàng. Quay về trang chủ để mua sắm !</Text>
        <Button className="btn-order-cart" 
                onClick={handleHome}
        >
          Trang chủ
        </Button>
      </Box>
      {/* <img className="image-media-cart" src="https://cdn.dribbble.com/users/108186/screenshots/3851554/addtocart.gif" alt="" /> */}
    </Box>
  );
};

export default OrderCart;
