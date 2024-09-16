import React from "react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import "../../../css/update/updateCart.css";
const UpdateCart = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <Box className="update-cart-page" p={4} textAlign="center">
      <Box
        className="update-cart-content"
        flexDirection="column"
        alignItems="center"
        justifyContent="center" 
      >
        <img
          src="/images/update-cart.png"
          alt="Update cart"
          className="update-cart-image"
        />
        <Text className="update-cart-message" size="large" bold mt={4}>
            Hiện chưa có đơn hàng nào cần xử lý
        </Text>
        <Text className="description-cart-message" size="small" bold mt={4}>
            Cùng Wind mua sắm bạn nhé
        </Text>
        <Button className="btn-home-cart-update" 
                onClick={handleHome}
                fullWidth
        >
          Mua hàng ngay
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateCart;
