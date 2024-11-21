import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import {
  Page,
  Text,
  Box,
  Modal,
  Icon,
  List,
  Button,
  Select,
} from "zmp-ui";
const { Item } = List;
import BottomNavigationComponent from "../shared/components/BottomNavigationComponent";
import CustomHeader from "../shared/pages/CustomHeader";
import "../../css/learningpath/home.css"
// Đăng ký các thành phần cần thiết
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Home = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { studentGuid, keyTab, studentName } = location.state || {};

  const handleItemClick = (path) => {
    navigate(path, {
      keyTab: "education",
      state: { studentGuid, keyTab, studentName},
    });
  };
  return (
    <Page className="page-fillters-student">
      <CustomHeader title={"Lộ trình học tập"}/>
      <List className="">
        <Item
          className="item-fillters-student"
          title="Giáo trình A"
          prefix={<Icon icon="zi-calendar" />}
          suffix={<Icon icon="zi-chevron-right" />}
          onClick={() => handleItemClick("/fillterstudent")}
        />
        <Item
          className="item-fillters-student"
          title="Giáo trình B"
          prefix={<Icon icon="zi-calendar" />}
          suffix={<Icon icon="zi-chevron-right" />}
          onClick={() => handleItemClick("/fillterstudent")}

        />
      </List>
      <BottomNavigationComponent studentGuid={studentGuid} studentName={studentName}/>
    </Page>
  );
};

export default Home;
