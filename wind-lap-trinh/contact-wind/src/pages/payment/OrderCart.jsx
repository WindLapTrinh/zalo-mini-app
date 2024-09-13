import React from "react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";

import "../../css/payment/orderCart.css";

const OrderCart = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/")
    }

  return (
    <Box className="order-cart">
      <img className="image-order-cart" src="/images/cart/order-cart.png" alt="Order cart" />
      <Text>Bạn chưa có sản phẩm nào trong giỏ hàng. Quay về trang chủ để mua sắm !</Text>
      <Button className="btn-order-cart" 
              onClick={handleHome}
      >
        Trang chủ
      </Button>
    </Box>
  );
};

export default OrderCart;
