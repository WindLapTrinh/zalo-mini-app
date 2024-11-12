import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Page, Button, Box, Modal, Icon, List } from "zmp-ui";
import axiosClient from "../shared/config/axios";
import useFormatDate from "../shared/hooks/useFormatDate";
import BottomNavigationComponent from "../shared/components/BottomNavigationComponent"; // Import the component
import ReviewAllDate from "../shared/pages/ReviewAllData";
import Notify from "../shared/pages/Notify";
import CustomHeader from "../shared/pages/CustomHeader"
import parse from "html-react-parser";
import "../../css/notify/home.css";

const { Item } = List;

const Notice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formatDate = useFormatDate();
  const { studentGuid, keyTab, studentName } = location.state || {};
  console.log("Nmame notify", studentName);
  const [modalVisible, setModalVisible] = useState(false);
  const [notifys, setNotifys] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0);

  // Fetch notifications on component mount and when studentGuid changes
  useEffect(() => {
    const fetchNotifys = async () => {
      try {
        const response = await axiosClient.get(
          `api/MiniApp/GetListNotifys?msgType=SK&guidStudent=${studentGuid}`
        );

        const savedState = JSON.parse(localStorage.getItem("isChecked")) || {};
        setNotifys(response.data.data.reverse()); // Reverse the array if needed
        setIsChecked(savedState);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thông báo:", error);
      }
    };

    fetchNotifys();
  }, [studentGuid]);

  // Calculate unseen notifications count whenever notifys or isChecked changes
  useEffect(() => {
    const countUnseen = () => {
      const unseenNotice = notifys.filter((notify) => !isChecked[notify.guid]);
      setUnseenCount(unseenNotice.length);
    };

    countUnseen();
  }, [notifys, isChecked]);
  // Send checked state to server
  const sendCheckedStateToServer = async (notify) => {
    try {
      await axiosClient.post(
        `api/MiniApp/CheckSeen?guid=${notify.guid}&check=true`
      );
      console.log("Trạng thái checked đã được gửi thành công lên server");
    } catch (error) {
      console.error("Lỗi khi gửi trạng thái checked lên server:", error);
    }
  };
  // Handle notification item click
  const handleItemClick = (notify) => {
    if (notify.seen === false) {
      sendCheckedStateToServer(notify);
      notify.seen = true;
    }
    setModalVisible(true);
    setSelectedNotice(notify);
  }

  // Handle navigation to date notice page
  const handleClickDate = () => {
    const newCurrentDate = new Date();
    navigate("/datenotify", {
      keyTab: "notify",
      state: { studentGuid, currentDate: newCurrentDate, keyTab, studentName },
    });
  };

  return (
    <Page className="page-notify">
      <CustomHeader title={"Thông báo"}/>
      <Box>
      {notifys.length === 0 ? (
        <Box className="header-notify">
          <Notify />
          <ReviewAllDate onClickDate={handleClickDate} />
        </Box>
      ) : (
        <Box>
          <List className="list-notify">
            {notifys.map((notify) => (
              <Item
                key={notify.guid}
                title={notify.title.length > 25
                  ? `${notify.title.substring(0, 25)}...`
                  : notify.title}
                prefix={<Icon icon="zi-calendar" />}
                suffix={<Icon icon="zi-chevron-right" />}
                onClick={() => handleItemClick(notify)}
                className={
                  notify.seen === false ? "item-notify" : "item-check-notify"
                }
                subTitle={"Ngày gửi: " + formatDate(notify.dateCreated)}
              />
            ))}
          </List>
          <ReviewAllDate onClickDate={handleClickDate} />
        </Box>
      )}
      </Box>

      <Modal
        visible={modalVisible}
        title="Thông báo"
        onClose={() => setModalVisible(false)}
        zIndex={1200}
        actions={[
          { text: "Đã hiểu", close: true },
          { text: "Thoát", close: true, danger: true },
        ]}
        description=""
      >
        <Box className="space-y-4 item-model-main">
          {selectedNotice &&
            parse(selectedNotice.jsonContent.replace(/"/g, ""))}
        </Box>
      </Modal>
      <BottomNavigationComponent studentGuid={studentGuid}  studentName={studentName}/>{" "}
    </Page>
  );
};

export default Notice;
