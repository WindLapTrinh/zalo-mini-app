import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Checkbox, Button, Icon } from "zmp-ui";
import { useAddress } from "../shared/common/cart/AddressContext";
import AddressCart from "./AddressCart.jsx";
import SetTitleHeader from "@/pages/shared/hooks/setTitleHeader";
import "../../css/cart/listAddress.css";

const ListAddress = () => {
  const navigate = useNavigate();
  const { address, setAddress } = useAddress();
  SetTitleHeader({
    title: "Danh sách địa chỉ",
  });
  useEffect(() => {
    // Retrieve addresses from local storage when the component mounts
    const storedAddresses = JSON.parse(localStorage.getItem("addresses"));
    if (storedAddresses) {
      setAddress(storedAddresses);
    }
  }, [setAddress]);

  // status check un check active address
  const handleCheckboxChange = (index) => {
    const updatedAddresses = address.map((addr, i) => {
      if (i === index) {
        return { ...addr, isDefault: true };
      } else {
        return { ...addr, isDefault: false }; // Optionally set others to false
      }
    });

    setAddress(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const handleAddInfomationAddress = () => {
    navigate("/addressCart");
  };

  return (
    <Box className="page-list-address">
      {address && Array.isArray(address) && address.length > 0 ? (
        <Box>
          <Box className="list-address">
            {address.map((addr, index) => (
              <div key={index} className="item-list-address">
                <Checkbox 
                  size="small"
                  className="checkbox-list-address"
                  checked={addr.isDefault}
                  onChange={() => handleCheckboxChange(index)}
                />
                <div className="address-details">
                  <Text className="header-list-address">{`${addr.name} - ${addr.phone}`}</Text>
                  <Text className="footer-list-address">{`${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}`}</Text>
                </div>
              </div>
            ))}
          </Box>
          <Button className="save-button" onClick={handleAddInfomationAddress}>
            <Icon icon="zi-plus-circle" className="icon-address" />
            <span>Thêm địa chỉ</span>
          </Button>
        </Box>
      ) : (
        <AddressCart />
      )}
    </Box>
  );
};

export default ListAddress;
