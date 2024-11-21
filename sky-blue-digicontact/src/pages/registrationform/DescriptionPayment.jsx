
import React from 'react';
import {Box, Text } from 'zmp-ui';
import "../../css/register/descriptionpayment.css"

const DescriptionPayment = () => {
    return (
        <Box className="page-description-payment">
            <Text className="content-description-payment">Bạn hãy nhấn chọn dòng thông tin để thanh toán online</Text>
            <img className="img-description-payment" src="./images/icon/payment-cart.jpg"/>
        </Box>
    );
}
export default DescriptionPayment;