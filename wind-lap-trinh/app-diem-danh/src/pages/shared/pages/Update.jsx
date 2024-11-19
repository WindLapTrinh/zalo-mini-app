import React from "react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import "../../../css/update/updatePage.css";
const UpdatePage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
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
          Chức năng đang phát triển, về trang chủ!
        </Text>
        <Button className="btn-home-update" onClick={handleHome}>
          Trang chủ
        </Button>
      </Box>
    </Box>
  );
};

export default UpdatePage;
