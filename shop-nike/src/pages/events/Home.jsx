import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomHeader from "../shared/pages/CustomHeader";
import ListEvent from "./List";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import {
  BottomNavigation,
  Box,
  Icon,
  Page,
  Sheet,
  Swiper,
  Text,
  Input,
  Tabs
} from "zmp-ui";
import "../../css/event/home.css"
const Home = () => {
  return (
    <Box className="page-event">
      <CustomHeader title={"Events"} showBackIcon={true} />
      <Box className="box-event-profile">
        <Box className="slider-by bg-white">
          <div className="tabs-wrapper">
            <Tabs
              className="horizontal-tabs"
              id="contact-list"
              scrollable="true"
            >
              <Tabs.Tab key="tab1" label="All">
                <ListEvent />
              </Tabs.Tab>
              <Tabs.Tab key="tab2" label="Arts & culture"></Tabs.Tab>
              <Tabs.Tab key="tab3" label="Basketball"></Tabs.Tab>
              <Tabs.Tab key="tab4" label="Dance"></Tabs.Tab>
              <Tabs.Tab key="tab5" label="Kids"></Tabs.Tab>
              <Tabs.Tab key="tab6" label="Mindfulness"></Tabs.Tab>
              <Tabs.Tab key="tab7" label="Running"></Tabs.Tab>
              <Tabs.Tab key="tab8" label="Skateboarding"></Tabs.Tab>
              <Tabs.Tab key="tab9" label="Sustainability"></Tabs.Tab>

            </Tabs>
          </div>
        </Box>
      </Box>
      <CustomBottomNavigation/>
    </Box>
  );
};
export default Home;
