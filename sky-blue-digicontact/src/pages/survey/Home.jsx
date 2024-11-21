import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Page,
  Icon,
  List,
  Modal,
  Box,
} from "zmp-ui";
import axiosClient from "../shared/config/axios" 
const { Item } = List;

const Home = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { username, studentGuid, phoneNumber } = location.state || {};
  const [surveys, setSurveys] = useState([]); 
  const [isChecked, setIsChecked] = useState({}); 
  const [unseenCount, setUnseenCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axiosClient.get(`api/MiniApp/GetListNotifys?msgType=KS&guidStudent=6ef7c8f0-3bb7-4f41-924d-95ac08d631db`);
        setSurveys(response.data.data); 
        const savedState = JSON.parse(localStorage.getItem("isCheckedSurveys")) || {};
        setIsChecked(savedState);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, [studentGuid]);

  useEffect(() => {
    const countUnseen = () => {
      const unseenSurveys = surveys.filter((survey) => !isChecked[survey.guid]);
      setUnseenCount(unseenSurveys.length);
    };

    countUnseen();
  }, [surveys, isChecked]);

  const saveCheckedState = (newState, callback) => {
    localStorage.setItem("isCheckedSurveys", JSON.stringify(newState));
    setIsChecked(newState);
    if (callback) {
      callback();
    }
  };

  const handleItemClick = (survey) => {
    const newIsChecked = { ...isChecked };
    const currentState = isChecked[survey.guid];
    const newCheckedState = !currentState;

    newIsChecked[survey.guid] = newCheckedState;

    if (!newCheckedState) {
      setUnseenCount((prevCount) => prevCount + 1);
    } else {
      setUnseenCount((prevCount) => prevCount - 1);
    }

    saveCheckedState(newIsChecked, () => {
      setModalVisible(true);
      setSelectedSurvey(survey);
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Page className="section-container">
      <List>
        {surveys.map(survey => (
          <Item
            key={survey.guid}
            title={survey.title}
            prefix={<Icon icon="zi-calendar" />}
            suffix={<Icon icon="zi-chevron-right" />}
            onClick={() => handleItemClick(survey)}
            className={
              !isChecked[survey.guid] ? "item-notify" : "item-check-notify"
            }
            subTitle={"Ngày gửi: " + new Date(survey.dateCreated).toLocaleDateString()} // Format the date if necessary
          />
        ))}
      </List>
      <Modal
        visible={modalVisible}
        title="Chi tiết khảo sát"
        onClose={closeModal}
        zIndex={1200}
        actions={[
          { text: "Đã hiểu", close: true },
          { text: "Thoát", close: true, highLight: true },
        ]}
      >
        <Box className="space-y-4">
          {selectedSurvey && <p>{selectedSurvey.jsonContent}</p>} {/* Customize content display as needed */}
        </Box>
      </Modal>
    </Page>
  );
};

export default Home;
