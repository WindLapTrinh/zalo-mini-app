import React from "react";
import { Outlet } from "react-router-dom";
import CustomHeader from "../pages/CustomHeader";
import CustomBottomNavigation from "./CustomBottomNavigation";
import { Box } from "zmp-ui";

const Layout = () => {
  return (
    <Box>
      <CustomHeader />
      <Outlet />
      <CustomBottomNavigation />
    </Box>
  );
};

export default Layout;
