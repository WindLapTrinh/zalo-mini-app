import React from "react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import {openChatScreen} from "../utils/openChatScreen"
import "../../../css/update/updatePage.css";
const Infomation = () => {
  const navigate = useNavigate();
  
  return (
    <Box className="update-page" p={4} textAlign="center">
      <Box
        className="update-content"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src="./images/update.png"
          alt="Update Image"
          className="update-image"
        />
        <Text className="update-message" size="large" bold mt={4}>
          Số điện thoại không có thông tin học viên tại trung tâm! Liên hệ để được hỗ trợ.
        </Text>
        <Button 
          className="btn-home-update" 
          onClick={openChatScreen}
          fullWidth
          >
          Liên hệ ngay
        </Button>
      </Box>
    </Box>
  );
};

export default Infomation;
