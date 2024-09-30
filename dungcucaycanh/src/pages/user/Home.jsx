import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Text, List, Icon } from "zmp-ui";
import SetTitleHeader from "../shared/hooks/setTitleHeader";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import FlashSale from "./FlashSale";
import CartOrder from "./CartOrder";
import Header from "./Infomation";
import Extension from "./Extension";
import ByBack from "./BuyBack";
import ListFunction from "./ListFunction";
import CustomHeader from "../shared/pages/CustomHeader";
import "../../css/user/home.css";

const Home = () => {
  const {keyTab } = location.state || {};

  return (
    <Box>
      <CustomHeader title={"Nguyễn Thanh Phong"} imageAccount={"./images/user/user-wind.jpg"} levelAccount={"Thành viên vàng"}/>
      <Box className="page-user">
        <FlashSale />
        <CartOrder />
        <Extension />
        <ByBack />
        <ListFunction />
      </Box>
      <CustomBottomNavigation />
    </Box>
  );
};

export default Home;
