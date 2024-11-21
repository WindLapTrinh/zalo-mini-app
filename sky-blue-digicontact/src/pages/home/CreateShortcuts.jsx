import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Page, Icon, Text } from "zmp-ui";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { createShortcut } from "zmp-sdk/apis";
import "../../css/home/createShortcuts.css";

const CreateShortcuts = () => {
  const navigate = useNavigate();
  const handleCreateShortcuts = async () => {
    try {
      await createShortcut({
        params: {
          utm_source: "shortcut",
        },
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  return (
    <Box>
      <Box className="header-create-shortcuts">
        <MdOutlinePhoneIphone className="icon-header-shortcuts" />
        <Text className="title-header-shortcuts">Tích hợp mini app</Text>
      </Box>
      <Box className="page-create-shortcuts">
        <img className="img-create-shortcuts" src="./images/icon/ileader.jpg" />
        <Text className="title-create-shortcuts">
          Tạo phím tắt vào ứng dụng trên màn hình chính
        </Text>
        <Box className="body-create-shortcuts" onClick={handleCreateShortcuts}>
          <Text className="title-btn-shortcuts">Tạo ngay</Text>
          <BsArrowRightCircleFill className="icon-btn-shortcuts" />
        </Box>
      </Box>
    </Box>
  );
};
export default CreateShortcuts;
