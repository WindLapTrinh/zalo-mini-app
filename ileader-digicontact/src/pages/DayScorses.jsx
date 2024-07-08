import React, { useState, useEffect, Fragment } from "react";
import { Page, List, Icon, Modal, Box, Button, useNavigate, Swiper  } from "zmp-ui";
import { configAppView } from "zmp-sdk/apis";
import { useLocation } from "react-router-dom";
import * as dateFns from "date-fns";
const { format } = dateFns;
import axios from "axios";
import "../css/detailHome.css";

//style  để định dạng cặp thông tin
const pairStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "-15px",
};

const { Item } = List;

const DayScorses = (props) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDayScorses, setSelectedDayScorses] = useState(null);
  const location = useLocation();

  const { studentGuid } = location.state || {};
  console.log("StudenGuiId cua Diem Danh:", studentGuid);
  const [dayScorsess, setDayScorsess] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0); // Biến đếm số lượng thông báo chưa được xem
  const [currentDate, setCurrentDate] = useState(new Date()); // State để lưu ngày hiện tại
  useEffect(() => {
    configAppView({
      headerColor: "#8861bb",
      statusBarColor: "#8861bb",
      headerTextColor: "white",
      hideAndroidBottomNavigationBar: true,
      hideIOSSafeAreaBottom: true,
      actionBar: {
        title: "Danh sách điểm danh",
        leftButton: "back",
      },
      success: (res) => {
        console.log("Goi thanh cong");
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, []);

  useEffect(() => {
    const fetchDayScorses = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/GetListNotifys?msgType=ĐD-NX&guidStudent=${studentGuid}`
        );

        // Cập nhật trạng thái với danh sách hóa đơn từ API
        setDayScorsess(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      } finally {
        setIsLoading(false); // Đánh dấu rằng đã tải xong dữ liệu
      }
    };
    // Gọi hàm để lấy danh sách hóa đơn
    fetchDayScorses();
  }, [studentGuid]);

  const formatDayScorses = (dayScorsess) => {
    if (!dayScorsess || !dayScorsess.jsonContent) return null;

    const parsedJsonContent = JSON.parse(dayScorsess.jsonContent);

    //ép mảng trong mảng
    const images = parsedJsonContent.flatMap((item) => item.Image);
    console.log(images);

    const infoPairs = parsedJsonContent.map((item, index) => ({
      value: (
        <div>
          <div>
            <label htmlFor="">Trạng thái: </label>
            <span>{item.Status}</span>
          </div>
          <div>
            <label htmlFor="">Nhận xét: </label>
            <span>
              {Array.isArray(item.CriteriaName)
                ? item.CriteriaName.join(", ")
                : item.CriteriaName}
            </span>
          </div>
          <div>
            <label htmlFor="">Ghi chú: </label>
            <span>{item.Note}</span>
          </div>
          <Box mt={2}>
            <Swiper>
              {/* Loop through item.Image to create Swiper slides */}
              {Array.isArray(item.Image) &&
                item.Image.map((imageSrc, imgIndex) => (
                  <Swiper.Slide key={imgIndex}>
                    <img
                      className="slide-img"
                      src={"https://ileader.cloud" + imageSrc}
                      alt={`slide-${imgIndex + 1}`}
                    />
                  </Swiper.Slide>
                ))}
            </Swiper>
          </Box>
        </div>
      ),
    }));

    return (
      <Fragment>
        {infoPairs.map((pair, index) => (
          <div
            style={{
              ...pairStyle,
              marginBottom: index === infoPairs.length - 1 ? 0 : "-5px",
            }}
            key={index}
          >
            {pair.value}
          </div>
        ))}
      </Fragment>
    );
  };

  //Notice
  // Tạo một hàm để đếm số lượng thông báo chưa đọc
  const countUnseen = () => {
    const unseenNotice = dayScorsess.filter(
      (dayScorses) => !isChecked[dayScorses.guid]
    );
    setUnseenCount(unseenNotice.length);
  };
  useEffect(() => {
    countUnseen();
  }, [dayScorsess, isChecked]);
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
  const handleItemClick = (dayScorses) => {
    const newIsChecked = { ...isChecked };
    const currentState = isChecked[dayScorses.guid];
    const newCheckedState =
      currentState === undefined || currentState === false ? true : true;

    newIsChecked[dayScorses.guid] = newCheckedState;

    if (!newCheckedState) {
      // Nếu trạng thái là false (chưa được xem), giảm biến đếm đi 1
      setUnseenCount((prevCount) => prevCount - 1);
    } else {
      // Nếu trạng thái là true (đã được xem), tăng biến đếm lên 1
      setUnseenCount((prevCount) => prevCount + 1);
    }

    saveCheckedState(newIsChecked, () => {
      setModalVisible(true);
      setSelectedDayScorses(dayScorses);
      // Gửi trạng thái checked lên server khi thông báo được click
      sendCheckedStateToServer(dayScorses.guid, newCheckedState);
      countUnseen(); // Gọi lại hàm đếm số lượng thông báo chưa đọc
    });
  };
  // end Notice

  //date
  const handleClickDate = () => {
    const newCurrentDate = new Date(); // Tạo một ngày mới
    setCurrentDate(newCurrentDate); // Cập nhật state currentDate với ngày mới
    console.log("Ngày hiện tại đã chọn:", newCurrentDate); // In ra ngày hiện tại sau khi cập nhật
    navigate("/datestudent", {
      state: { studentGuid, currentDate: newCurrentDate },
    }); // Truyền currentDate vào navigate
  };
  //end date

  return (
    <Page className="section-container">
      {dayScorsess.length === 0 ? (
        <div>
          <Box mt={5} mb={5}>
            <Button
              className="btn-scorses"
              onClick={handleClickDate}
              size="large"
            >
              Xem tất cả
            </Button>
            <div className="text-student">
              Hiện tại không có thông báo điểm danh mới ?
            </div>
          </Box>
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
          {dayScorsess.map((dayScorses) => (
            <Item
              key={dayScorses.guid}
              title={dayScorses.title.substring(10)}
              prefix={<Icon icon="zi-calendar" />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => handleItemClick(dayScorses)}
              className={isChecked[dayScorses.guid] ? "checked" : ""}
            />
          ))}
        </List>
      )}
      <Modal
        visible={modalVisible}
        title="Bảng điểm danh"
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
          {selectedDayScorses && (
            <React.Fragment>
              {[]
                .concat(formatDayScorses(selectedDayScorses))
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </Page>
  );
};
export default DayScorses;
