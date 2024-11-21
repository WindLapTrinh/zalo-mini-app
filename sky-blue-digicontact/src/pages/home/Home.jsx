import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Page } from "zmp-ui";
import Introduce from "./Introduce.jsx";
import Slider from "./Slider.jsx";
import Feature from "./Feature.jsx";
import Infomation from "./Infomation.jsx";
import CreateShortcuts from "./CreateShortcuts.jsx";
import BottomNavigationComponent from "../shared/components/BottomNavigationComponent";
import {openChatScreen} from "../shared/utils/openChatScreen.js";
import useUser from "../shared/hooks/useUser.js"
import CustomHeader from "../shared/pages/CustomHeader.jsx";
import "../../css/home/home.css";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentName, studentGuid, phoneNumber } = location.state || {};
  console.log("Name home", studentName);
  console.log("Guid Students",studentGuid);
   // Sử dụng useUser để lấy thông tin người dùng
   const { userInfo, loading, error } = useUser();
   console.log("Name", userInfo && userInfo.name || "");

   const handleBackClick = () => {
    if (studentName) {
      navigate("/students", {state: {phoneNumber}});
    } else {
      navigate(-1);
    }
  };

  return (
    <Page className="page-home">
      <CustomHeader title={studentName} showBackIcon={true} onBackClick={handleBackClick}/>
      <Box className="header-home">
        <Introduce />
        <Slider />
        <Feature />
      </Box>
      <Box className="body-home">
        <CreateShortcuts />
        <Infomation />
      </Box>
      <BottomNavigationComponent
        studentGuid={studentGuid}
        studentName={studentName}
        phoneNumber={phoneNumber}
        openChatScreen={openChatScreen}
      />
    </Page>
  );
};

export default Home;
