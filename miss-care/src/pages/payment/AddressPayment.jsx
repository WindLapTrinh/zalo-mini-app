import React from "react";
import { List, Icon, Box, Text } from "zmp-ui";
import { LuMapPin } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../shared/common/cart/AddressContext";
import "../../css/cart/listAddress.css";
import "../../css/payment/addressPayment.css";

const AddressPayment = () => {
  const navigate = useNavigate();
  const { address, setAddress } = useAddress();
  const handleAddress = () => {
    navigate("/addressCart");
  };

  return (
    <Box className="address-payment">
      <Box className="header-address-payment">
        <LuMapPin className="icon-address-payment" />
        <Text className="title-address-payment" size="large" bold mb={3}>
          Địa chỉ nhận hàng
        </Text>
      </Box>
      <Box className="info-address" mt={2}>
        {address && Array.isArray(address) && address.length > 0 ? (
          address.map((addr, index) => (
            <div key={index}>
              {addr.isDefault == true && (
                <Box className="address-details">
                  <Text className="title-address-cart">{`${addr.name} - ${addr.phone}`}</Text>
                  <Text className="item-description">{`${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}`}</Text>
                </Box>
              )}
            </div>
          ))
        ) : (
          <Text className="detail-address-payment" onClick={handleAddress}>
            Bạn hãy nhập địa chỉ
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default AddressPayment;
