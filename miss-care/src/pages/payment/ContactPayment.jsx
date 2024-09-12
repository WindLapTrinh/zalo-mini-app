import React from "react";
import { Box, Text } from "zmp-ui";
import {openChatScreen} from "../shared/utils/openChatScreen"
import "../../css/payment/contactPayment.css";


const ContactPayment = () => {
  
  return (
    <Box className="contact-payment">
      <Box className="detail-contact-payment">
        <Box className="label">
          <Text className="title-contact-payment">
            Hãy liên hệ với chúng tôi nếu bạn muốn thay đổi thông tin đơn hàng
            bạn nhé
          </Text>
        </Box>
        <Box className="contact-shop" onClick={openChatScreen}>
          <img className="image-zalo-pay" src="/images/icon/zalo.jpg" />
          <Text className="content-shop">Liên hệ với Tomo Order</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPayment;
