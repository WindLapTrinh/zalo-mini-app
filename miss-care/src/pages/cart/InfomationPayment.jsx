import React from "react";
import { List, Icon, Box, Text } from "zmp-ui";
import "../../css/cart/infomationPayment.css";
import { FaSackDollar } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { Title } from "chart.js";
const InfomationPayment = () => {
  return (
    <Box className="detail-payment">
      <Box className="header-cart-product">
        <img
          className="icon-header-cart"
          src="/images/icon/detail-payment.jpg"
        />
        <Text className="section-title" size="large" bold mb={3}>
          Chi tiết thanh toán
        </Text>
      </Box>
      <Box className="payment-cart" mt={2}>
        <List>
          <List.Item className="payment-detail">
            <div className="list-item-payment">
              <FaSackDollar className="payment-icon" />
              <div className="item-payment">
                <div className="title-sum-cart">0 đ</div>
                <div className="payment-description">Tổng tiền hàng</div>
              </div>
            </div>
          </List.Item>
          <List.Item className="payment-detail">
            <div className="list-item-payment">
              <FaTruck className="payment-icon" />
              <div className="item-payment">
                <div className="title-frre-payment">Miễn phí vận chuyển</div>
                <div className="free-description">Phí vận chuyển</div>
                <div className="ticker-ship">Giảm 30k phí vận chuyển đơn từ 200k</div>
              </div>
            </div>
            <div className="payment-methods">
              <div className="title-method">Các phương thức thanh toán</div>
              <Box className="orthe-cart-product">
                <img
                  className="icon-orthe-cart"
                  src="/images/icon/zalo-pay.jpg"
                />
                <img
                  className="icon-orthe-cart"
                  src="/images/icon/payment-cart.jpg"
                />
                <img className="icon-orthe-cart" src="/images/icon/cash.jpg" />
              </Box>
              <Box mt={2}>
                <div className="content-orthe-cart">
                  Hỗ trợ đầy đủ các phương thức thanh toán như:
                </div>
                <div className="descript-orther-cart">
                  Zalo Pay, thanh toán khi nhận hàng, chuyển khoản
                </div>
                <div className="note-orthe-cart">
                  (*) Lựa chọn các thương thức thanh toán sau khi đặt hàng
                </div>
              </Box>
            </div>
          </List.Item>
        </List>
      </Box>
      <Box className="contact-cart" mt={2}>Bằng với việc tiến hàng đặt hàng, bạn đồng ý với điều kiện và điều khoản sử dụng của Mini App Tomo Makert</Box>
    </Box>
  );
};

export default InfomationPayment;
