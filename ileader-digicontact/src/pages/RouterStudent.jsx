import React from "react";
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
import "../css/listbill.css";
import "../css/detailHome.css";
const { Item } = List;


// Đăng ký các thành phần cần thiết
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const RouterrStudent = () => {
  const navigate = useNavigate(); 

  const handleItemClick = (path) => {
    navigate(path);
  };
  return (
    <Page className="section-container">
      <List>
        <Item
          title="Giáo trình A"
          prefix={<Icon icon="zi-calendar" />}
          suffix={<Icon icon="zi-chevron-right" />}
          onClick={() => handleItemClick("/fillterstudent")}
        />
        <Item
          title="Giáo trình B"
          prefix={<Icon icon="zi-calendar" />}
          suffix={<Icon icon="zi-chevron-right" />}
          onClick={() => handleItemClick("/fillterstudent")}

        />
        <Item
          title="Giáo trình C"
          prefix={<Icon icon="zi-calendar" />}
          suffix={<Icon icon="zi-chevron-right" />}
          onClick={() => handleItemClick("/fillterstudent")}

        />
      </List>
    </Page>
  );
};

export default RouterrStudent;
