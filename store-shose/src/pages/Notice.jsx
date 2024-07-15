import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Page, Button, Box, Modal, useNavigate, Icon, List } from "zmp-ui";
import { configAppView } from "zmp-sdk/apis";
import axios from "axios";
import "../css/listbill.css";
import "../css/detailHome.css";

const { Item } = List;

const Notice = ({ tasks, props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentGuid } = location.state || {};
  console.log("StudenGuiId:", studentGuid);

  const [modalVisible, setModalVisible] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0); // Biến đếm số lượng thông báo chưa được xem
  const [currentDate, setCurrentDate] = useState(new Date()); // State để lưu ngày hiện tại

  useEffect(() => {
    // Gọi API configAppView để cấu hình giao diện ứng dụng
    configAppView({
      headerColor: "#8861bb",
      statusBarColor: "#8861bb",
      headerTextColor: "white",
      hideAndroidBottomNavigationBar: true,
      hideIOSSafeAreaBottom: true,
      actionBar: {
        title: "Danh sách thông báo",
        leftButton: "back",
      },
      success: (res) => {
        // Xử lý khi gọi API thành công
        console.log("Goi thanh cong");
      },
      fail: (error) => {
        // Xử lý khi gọi API thất bại
        console.log(error);
      },
    });
  }, []);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/GetListNotifys?msgType=SK&guidStudent=${studentGuid}`
        );

        // Lấy trạng thái đã lưu từ localStorage, nếu không có thì sử dụng giá trị mặc định là false
        const savedState = JSON.parse(localStorage.getItem("isChecked")) || {};

        // Cập nhật trạng thái với danh sách hóa đơn từ API và trạng thái đã lưu
        setBills(response.data.data.reverse());
        setIsChecked(savedState);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách hóa đơn:", error);
      }
    };
    // Gọi hàm để lấy danh sách hóa đơn
    fetchBills();
  }, [studentGuid]);
  //Notice
  // Tạo một hàm để đếm số lượng thông báo chưa đọc
  const countUnseen = () => {
    const unseenNotice = bills.filter((bill) => !isChecked[bill.guid]);
    setUnseenCount(unseenNotice.length);
  };
  useEffect(() => {
    countUnseen();
  }, [bills, isChecked]);
  //Notice
  useEffect(() => {
    const loadCheckedState = () => {
      const storedCheckedState = localStorage.getItem("isChecked");
      if (storedCheckedState) {
        setIsChecked(JSON.parse(storedCheckedState));
      }
    };

    loadCheckedState();
  }, []);

  const saveCheckedState = (newState, callback) => {
    localStorage.setItem("isChecked", JSON.stringify(newState));
    setIsChecked(newState);
    if (callback) {
      callback();
    }
  };

  const sendCheckedStateToServer = async (regGuid, checkedState) => {
    try {
      // Gửi yêu cầu POST đến server để cập nhật trạng thái checked của thông báo
      await axios.post(
        `https://ileader.cloud/api/MiniApp/CheckSeen?guid=${regGuid}&check=${checkedState}`,
        {
          guid: regGuid,
          checked: checkedState,
        }
      );
      console.log("Trạng thái checked đã được gửi thành công lên server");
    } catch (error) {
      console.error("Lỗi khi gửi trạng thái checked lên server:", error);
    }
  };
  // Trong hàm handleItemClick, sau khi cập nhật trạng thái checked, gọi lại hàm đếm số lượng thông báo chưa đọc
  const handleItemClick = (bill) => {
    const newIsChecked = { ...isChecked };
    const currentState = isChecked[bill.guid];
    const newCheckedState =
      currentState === undefined || currentState === false ? true : true;

    newIsChecked[bill.guid] = newCheckedState;

    if (!newCheckedState) {
      // Nếu trạng thái là false (chưa được xem), giảm biến đếm đi 1
      setUnseenCount((prevCount) => prevCount - 1);
    } else {
      // Nếu trạng thái là true (đã được xem), tăng biến đếm lên 1
      setUnseenCount((prevCount) => prevCount + 1);
    }

    saveCheckedState(newIsChecked, () => {
      setModalVisible(true);
      setSelectedNotice(bill);
      // Gửi trạng thái checked lên server khi thông báo được click
      sendCheckedStateToServer(bill.guid, newCheckedState);
      countUnseen(); // Gọi lại hàm đếm số lượng thông báo chưa đọc
    });
  };
  // end Notice

  //date
  const handleClickDate = () => {
    const newCurrentDate = new Date(); // Tạo một ngày mới
    setCurrentDate(newCurrentDate); // Cập nhật state currentDate với ngày mới
    console.log("Ngày hiện tại đã chọn:", newCurrentDate); // In ra ngày hiện tại sau khi cập nhật
    navigate("/datenotice", {
      state: { studentGuid, currentDate: newCurrentDate },
    }); // Truyền currentDate vào navigate
  };
  //end date

  return (
    <Page className="section-container">
      {bills.length === 0 ? (
        <div>
          <Box mt={5} mb={5}>
            <Button
              className="btn-scorses"
              onClick={handleClickDate}
              size="large"
            >
              Xem tất cả
            </Button>
          </Box>
          <div className="text-student">
            Hiện tại không có thông tin thông báo nào ?
          </div>
        </div>
      ) : (
        <List>
          <Box mt={5} mb={5}>
            <Button
              className="btn-scorses"
              onClick={handleClickDate}
              size="large"
            >
              Xem tất cả
            </Button>
          </Box>
          {bills.map((bill) => (
            <Item
              key={bill.guid} // Đảm bảo sử dụng một giá trị duy nhất làm key
              title={bill.title}
              prefix={<Icon icon="zi-calendar" />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => handleItemClick(bill)}
              className={isChecked[bill.guid] ? "checked" : ""}
            />
          ))}
        </List>
      )}
      <Modal
        visible={modalVisible}
        title="Thông báo"
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
            highLight: true,
          },
        ]}
        description=""
      >
        <Box className="space-y-4">
          {selectedNotice?.jsonContent
            .replace(/\\n/g, "\n")
            .replace(/^"(.*)"$/, "$1") || ""}
        </Box>
      </Modal>
    </Page>
  );
};

export default Notice;
