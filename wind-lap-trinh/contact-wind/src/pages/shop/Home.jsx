import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button, Swiper, BottomNavigation, Icon, Sheet, Input, Tabs} from "zmp-ui";
import CustomHeader from "../shared/pages/CustomHeader.jsx";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation.jsx";
import Category from "./Category.jsx";
import ProductToday from "./ProductToDay.jsx";
import MenuPage from "./MenuPage.jsx";
import FindYou from "./FindYou.jsx";
import ProductFavorite from "./ProductFavorite.jsx";
import Brand from "./Brand.jsx"
import "../../css/shop/home.css"

const Home = () => {
  return (
    <Box className="page-shop">
      <CustomHeader title={"Shop"} />
      <Box className="box-shop">
        <Box className="category-shop">
          <Box className="slider-by bg-white p-4">
            <div className="tabs-wrapper">
              <Tabs
                className="horizontal-tabs"
                id="contact-list"
                scrollable="true"
              >
                <Tabs.Tab key="tab1" label="Men">
                    <Category/>
                    <ProductToday/>
                    <MenuPage/>
                    <ProductFavorite/>
                    <FindYou/>
                    <Brand/>
                </Tabs.Tab>
                <Tabs.Tab key="tab2" label="Women">
                  
                </Tabs.Tab>
                <Tabs.Tab key="tab3" label="Kids">

                </Tabs.Tab>
              </Tabs>
            </div>
          </Box>
        </Box>
      </Box>
      <CustomBottomNavigation />
    </Box>
  );
};

export default Home;
