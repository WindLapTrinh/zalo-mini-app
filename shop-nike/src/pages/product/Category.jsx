import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Tabs } from "zmp-ui";
import ProductList from "./ProductList";
import CustomHeader from "../shared/pages/CustomHeader";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation"
import "../../css/product/category.css";

const Category = ({ categories, gotoCategory }) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Box>
      <CustomHeader title={"Sneakers Of The Week"} showBackIcon={true}/>
      <Box className="by-product">
        <Box className="category-by">
          <Box className="slider-by bg-white p-4">
            <div className="tabs-wrapper">
              <Tabs
                className="horizontal-tabs"
                id="contact-list"
                scrollable="true"
              >
                <Tabs.Tab key="tab1" label="All">
                  <ProductList/>
                </Tabs.Tab>
                <Tabs.Tab key="tab2" label="Shose"></Tabs.Tab>
              </Tabs>
            </div>
          </Box>
        </Box>
      </Box>
      <CustomBottomNavigation/>
    </Box>
  );
};

export default Category;
