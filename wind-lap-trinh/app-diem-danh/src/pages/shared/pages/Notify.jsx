import React from "react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import "../../../css/notify/notifyPage.css";
const NotifyPage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };
  return (
    <Box className="page-notify" mb={4} textAlign="center">
      <Box
        className="notify-content"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src="./images/notify.png"
          alt="notify Image"
          className="notify-image"
        />
        <Text className="notify-message" size="large" bold mt={4}>
            Hiện tại bạn chưa có thông báo nào!
        </Text>
        {/* <Button className="btn-home-notify" onClick={handleHome}>
          Trang chủ
        </Button> */}
      </Box>
    </Box>
  );
};

export default NotifyPage;
