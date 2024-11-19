import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Page, Button, Text } from "zmp-ui";
import CustomHeader from "../shared/pages/CustomHeader";
import "../../css/contact/home.css";
import Introduce from "./Introduce";
import { RiFunctionAddFill } from "react-icons/ri";
import { openChatScreen } from "../shared/utils/openChatScreen";
const Home = () => {
  const navigate = useNavigate();
  const handleGoSchool = () => {
    navigate("/login");
  };
  return (
    <Page className="page-contact">
      <CustomHeader imageUrl={"images/icon/logo.png"} />
      <Box className="header-contact" mt={2}>
        <Introduce />
      </Box>
      <Box className="fouder-contact" mt={2}>
        <RiFunctionAddFill className="icon-contact" />
        <span className="name-application">Chức năng</span>
      </Box>
      <Box className="body-contact">
        <Text className="title-contact">
          Nếu bạn chưa có học viên đăng ký tại trung tâm thì liên hệ tại trung
          tâm để đăng ký khóa học, đã có học viên học tại trung tâm thì nhấn vào
          học.
        </Text>
        <Box className="event-contact">
          <Button className="btn-contact" onClick={openChatScreen}>
            Liên hệ
          </Button>
          <Button className="btn-school" onClick={() => handleGoSchool()}>
            Vào học
          </Button>
        </Box>
      </Box>
    </Page>
  );
};
export default Home;
