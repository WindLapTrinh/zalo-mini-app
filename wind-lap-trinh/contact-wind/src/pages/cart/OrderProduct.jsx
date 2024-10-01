import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button } from "zmp-ui";
import { paymentContext } from "../shared/common/payment/PaymentContext";
import "../../css/cart/orderProduct.css";

const OrderProduct = ({ items }) => {
  const navigate = useNavigate();
  const { setPaymentData } = paymentContext();

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toLocaleString("vi-VN");

  const handleCheckout = () => {
    setPaymentData(items); // Pass the items instead of cart
    navigate("/homePayment");
    console.log(items);
  };

  return (
    <Box className="order-product-container">
      <Box className="order-product-cart">
        <Box className="payment-summary">
          <Text size="medium" bold className="text-sum-cart">
            Tổng cộng
          </Text>
          <Text className="calculate-total" size="medium">{totalPrice.toLocaleString("vi-VN")} đ</Text>
        </Box>
        <Button className="btn-payment" onClick={handleCheckout}>
          Thanh toán
        </Button>
      </Box>
    </Box>
  );
};

export default OrderProduct;
