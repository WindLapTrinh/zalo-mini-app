import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  Box,
  Icon,
  Page,
  Sheet,
  Swiper,
  Text,
  Input,
} from "zmp-ui";
import Introduce from "./Introduce";
import CategoryProduct from "./CategoryProduct";
import CustomBottomNavigation from "@/pages/shared/components/CustomBottomNavigation";
import CustomHeader from "../shared/pages/CustomHeader";

import "../../css/detailHome.css";
const Home = (props) => {
  const navigate = useNavigate();

  return (
    <Box>
      <CustomHeader
        title={"Wind Lập Trình"}
        subtitle={"Đội ngũ lập trình GenZ"}
        imageUrl={"./images/logo/wind-app.png"}
      />
      <Page className="home">
        <Introduce/>
        <CategoryProduct/>
        <CustomBottomNavigation/>
      </Page>x
    </Box>
  );
};

export default Home;
