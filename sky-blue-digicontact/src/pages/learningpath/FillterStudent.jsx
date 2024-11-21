import React, { useEffect, useRef, useState } from "react";
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
import { openBioAuthentication } from "zmp-sdk/apis";
import BottomNavigationComponent from "../shared/components/BottomNavigationComponent";
import CustomHeader from "../shared/pages/CustomHeader";
const { Item } = List;


// Đăng ký các thành phần cần thiết
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const FillterStudent = () => {
  const location = useLocation();
  const { studentGuid, activeTab, studentName } = location.state || {};
  const [modalVisible, setModalVisible] = useState(false);

  openBioAuthentication({
    secretData: "<secretData>",
    ui: {
      title: "Biometric login for my app",
      subTitle: "Log in using your biometric credential",
      negativeButtonText: "Cancel",
    },
    success: (data) => {},
    fail: (error) => {
      const { code } = error;
    },
  });

  return (
    <Page className="section-container">
      <CustomHeader title={"Giáo trình A"} showBackIcon={true}/>
      <Box className="box-header-app">
        <Select placeholder="Giáo trình A" multiple defaultValue="1">
          <Option value="1" title="Giáo trình B" />
          <Option value="2" title="Giáo trình C" />
        </Select>
      </Box>
      <Doughnut
        data={{
          labels: ["iLeader", "KingHR", "IZWork", "SLK Solution", "Wind"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
              ],
              data: [2478, 5267, 734, 784, 433],
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: "Predicted world population (millions) in 2050",
          },
        }}
      />
      <List className="page-list-curriculum">
        <Item
          className="item-fillters-student"
          title="Lịch giáo trình A"
          prefix={<Icon icon="zi-calendar" />}
          suffix={<Icon icon="zi-chevron-right" />}
          onClick={() => {
            setModalVisible(true);
          }}
        />
      </List>
      <Modal
        visible={modalVisible}
        title="Chức năng hiện đang phát triển"
        coverSrc= {"/images/update.png"}
        onClose={() => {
          setModalVisible(false);
        }}
        zIndex={1200}
        actions={[
          {
            text: "Đã hiểu",
            close: true,
          },
          {
            text: "Thoát",
            close: true,
            danger: true,
          },
        ]}
      >
        
      </Modal>
      <BottomNavigationComponent studentGuid={studentGuid} key={activeTab} studentName={studentName}/>
    </Page>
  );
};

export default FillterStudent;
