import React, { useState, useEffect, Fragment } from "react";
import {
  Page,
  List,
  Icon,
  Modal,
  Box,
  Button,
  DatePicker,
  Text,
  Picker,
  Input,
  Select,
  ImageViewer,
  Swiper,
} from "zmp-ui";
import { configAppView } from "zmp-sdk/apis";
import { useLocation, useNavigate } from "react-router-dom";
import * as dateFns from "date-fns";
const { format } = dateFns;
import axios from "axios";
import "../css/dateaction.css";

//style  để định dạng cặp thông tin
const pairStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "-15px",
};

const { Item } = List;

const DateStudent = (props) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDayScorses, setSelectedDayScorses] = useState(null);
  const location = useLocation();
  const { studentGuid, currentDate } = location.state || {};
  console.log("StudenGuiId cua Diem Danh", studentGuid);
  console.log("Current Date:", currentDate);
  const [dayScorsess, setDayScorsess] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0); // Biến đếm số lượng thông báo chưa được xem
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  // Thêm biến state mới để lưu năm hiện tại
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, serCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
    // Tính toán và lưu năm hiện tại vào biến state
    setCurrentYear(new Date().getFullYear());
    serCurrentMonth(new Date().getMonth() + 1);
  }, []);

  useEffect(() => {
    const fetchDayScorses = async () => {
      try {
        let apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=ĐD-NX&guidStudent=${studentGuid}`;

        if (currentDate) {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const formattedYear = year.toString();
          const formattedMonth = month < 10 ? `0${month}` : month.toString();
          apiUrl += `&month=${formattedMonth}&year=${formattedYear}`;
          console.log(apiUrl);
        }

        if (currentDate || (currentMonth && currentYear)) {
          apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=ĐD-NX&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
          console.log(apiUrl);
        }
        if (selectedMonth && selectedYear) {
          apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=ĐD-NX&guidStudent=${studentGuid}&month=${selectedMonth}&year=${selectedYear}`;
          console.log(apiUrl);
        } else if (selectedMonth || selectedYear == null) {
          if (selectedMonth != null) {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=ĐD-NX&guidStudent=${studentGuid}&month=${selectedMonth}&year=${currentYear}`;
            console.log(apiUrl);
          } else {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=ĐD-NX&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
            console.log(apiUrl);
          }
        } else {
          if (selectedYear != null) {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=ĐD-NX&guidStudent=${studentGuid}&month=${currentMonth}&year=${selectedYear}`;
            console.log(apiUrl);
          } else {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=ĐD-NX&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
            console.log(apiUrl);
          }
        }

        const response = await axios.get(apiUrl);
        setDayScorsess(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      }
    };

    // Gọi hàm để lấy danh sách hóa đơn
    fetchDayScorses();
  }, [studentGuid, currentDate, selectedMonth, selectedYear]);

  const formatDayScorses = (dayScorsess) => {
    if (!dayScorsess || !dayScorsess.jsonContent) return null;

    const parsedJsonContent = JSON.parse(dayScorsess.jsonContent);
    // Extract image URLs
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
        `https://cap2.ileader.vn/api/MiniApp/CheckSeen?guid=${regGuid}&check=${checkedState}`,
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

  //bo loc date
  const genTestData = (name, number, prefix = "Tháng") => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < number; i++) {
      data.push({
        value: i + 1,
        displayName: `${prefix} ${i + 1}`,
      });
    }
    return data;
  };
  const getYear = (name, endYear, prefix = "Năm", currentYear) => {
    const data = [];
    for (let i = currentYear; i <= endYear; i++) {
      data.push({
        value: i,
        displayName: `${prefix} ${i}`,
      });
    }
    return data;
  };

  // Hàm xử lý khi nhấn nút "Chọn"
  const handleOnlickGetMonth = () => {
    if (selectedMonth) {
      console.log("Tháng đã chọn:", selectedMonth);
      // Thực hiện các xử lý khác tùy thuộc vào giá trị tháng đã chọn ở đây
    } else {
      console.error("Chưa chọn tháng");
    }
  };
  const handleOnlickGetYear = () => {
    if (selectedYear) {
      console.log("Năm đã chọn:", selectedYear);
    } else {
      console.error("Chưa chọn năm");
    }
  };

  const handleOptionChange = (value) => {
    if (value && value.option && value.option.value) {
      const selectedMonthValue = value.option.value;
    } else {
      console.error("Không tìm thấy giá trị tháng đã chọn");
    }
  };
  //end bo loc date
  const images = [
    {
      src: "https://stc-zmp.zadn.vn/zmp-zaui/images/e2e10aa1a6087a5623192.jpg",
      alt: "img 1",
      key: "1",
    },
    {
      src: "https://stc-zmp.zadn.vn/zmp-zaui/images/fee40cbea0177c4925061.jpg",
      alt: "img 2",
      key: "2",
    },
    {
      src: "https://stc-zmp.zadn.vn/zmp-zaui/images/82ca759bd932056c5c233.jpg",
      alt: "img 3",
      key: "3",
    },
    {
      src: "https://stc-zmp.zadn.vn/zmp-zaui/images/77f5b8cd1464c83a91754.jpg",
      alt: "img 4",
      key: "4",
    },
    {
      src: "https://stc-zmp.zadn.vn/zmp-zaui/images/e2e10aa1a6087a5623192.jpg",
      alt: "img 1",
      key: "5",
    },
    {
      src: "https://stc-zmp.zadn.vn/zmp-zaui/images/fee40cbea0177c4925061.jpg",
      alt: "img 2",
      key: "6",
    },
    {
      src: "https://stc-zmp.zadn.vn/zmp-zaui/images/82ca759bd932056c5c233.jpg",
      alt: "img 3",
      key: "7",
    },
    {
      src: "https://stc-zmp.zadn.vn/zmp-zaui/images/77f5b8cd1464c83a91754.jpg",
      alt: "img 4",
      key: "8",
    },
  ];

  return (
    <Page className="section-container">
      <Box mt={6} pl={2}>
        <div className="form-date">
          <div className="date-left">
            <Box mt={6}>
              <Select
                label="Chọn tháng"
                placeholder="chọn tháng..."
                defaultValue={currentMonth}
                onChange={(value) => {
                  // Lưu giá trị nam đã chọn vào biến trạng thái
                  setSelectedMonth(value);
                  handleOptionChange(value);
                }}
                closeOnSelect={true}
              >
                {genTestData("key1", 12, "Tháng", currentMonth).map(
                  (option) => (
                    <Option
                      key={option.value}
                      value={option.value}
                      title={option.displayName}
                      onClick={handleOnlickGetMonth}
                    >
                      {option.displayName}
                    </Option>
                  )
                )}
              </Select>
            </Box>
          </div>
          <div className="date-right">
            <Box mt={6}>
              <Select
                label="Chọn năm"
                placeholder="chọn năm..."
                defaultValue={currentYear}
                onChange={(value) => {
                  // Lưu giá trị nam đã chọn vào biến trạng thái
                  setSelectedYear(value);
                  handleOptionChange(value);
                }}
                closeOnSelect={true}
              >
                {getYear("key2020", 2050, "Năm", currentYear).map((option) => (
                  <Option
                    key={option.value}
                    value={option.value}
                    title={option.displayName}
                    onClick={handleOnlickGetYear}
                  >
                    {option.displayName}
                  </Option>
                ))}
              </Select>
            </Box>

            {console.log("Nam truyen qua", currentYear)}
          </div>
        </div>
      </Box>

      <Box mt={6} mb={6} pl={2}>
        <Text.Title className="title-scores">
          Danh sách học viên theo tháng
        </Text.Title>
      </Box>
      {dayScorsess.length === 0 ? (
        <div className="text-student">
          Hiện tại không có thông tin điểm danh nào ?
        </div>
      ) : (
        <List>
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
export default DateStudent;
