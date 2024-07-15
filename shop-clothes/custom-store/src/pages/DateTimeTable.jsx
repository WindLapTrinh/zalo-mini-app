import React, { useState, useEffect, Fragment } from "react";
import { Page, List, Icon, Modal, Box, Select, Text } from "zmp-ui";
import { configAppView } from "zmp-sdk/apis";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as dateFns from "date-fns";
const { format } = dateFns;
import "../css/timetable.css";
const pairStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "-15px",
};
const { Item } = List;

const TimeTable = (props) => {
  const location = useLocation();
  const { studentGuid, currentDate } = location.state || {};
  const [timeTables, settimeTables] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0); // Biến đếm số lượng thông báo chưa được xem

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  // Thêm biến state mới để lưu năm hiện tại
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, serCurrentMonth] = useState(currentDate.getMonth() + 1);

  useEffect(() => {
    configAppView({
      headerColor: "#8861bb",
      statusBarColor: "#8861bb",
      headerTextColor: "white",
      hideAndroidBottomNavigationBar: true,
      hideIOSSafeAreaBottom: true,
      actionBar: {
        title: "Thời khóa biểu",
        leftButton: "back",
      },
      success: (res) => {
        console.log("Gọi thanh công");
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
    const fetchTimeTable = async () => {
      try {
        let apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=TKB&guidStudent=${studentGuid}`;

        if (currentDate) {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const formattedYear = year.toString();
          const formattedMonth = month < 10 ? `0${month}` : month.toString();
          apiUrl += `&month=${formattedMonth}&year=${formattedYear}`;
          console.log(apiUrl);
        }

        if (currentDate || (currentMonth && currentYear)) {
          apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=TKB&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
          console.log(apiUrl);
        }
        if (selectedMonth && selectedYear) {
          apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=TKB&guidStudent=${studentGuid}&month=${selectedMonth}&year=${selectedYear}`;
          console.log(apiUrl);
        } else if (selectedMonth || selectedYear == null) {
          if (selectedMonth != null) {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=TKB&guidStudent=${studentGuid}&month=${selectedMonth}&year=${currentYear}`;
            console.log(apiUrl);
          } else {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=TKB&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
            console.log(apiUrl);
          }
        } else {
          if(selectedYear != null){
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=TKB&guidStudent=${studentGuid}&month=${currentMonth}&year=${selectedYear}`;
          console.log(apiUrl);
          }else{
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=TKB&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
            console.log(apiUrl);
          }
        }
        const response = await axios.get(apiUrl);
        settimeTables(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      }
    };
    fetchTimeTable();
  }, [studentGuid, currentDate, selectedMonth, selectedYear]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const parsedDate = new Date(dateString);
    return format(parsedDate, "dd/MM/yyyy");
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";

    const parsedDate = new Date(dateString);
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();

    // Đảm bảo rằng giờ và phút luôn có hai chữ số
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}`;
  };

  const formatTimetable = (timeTable) => {
    //lay jsCotent ngoai cung
    const parsedJsonContent = JSON.parse(timeTable.jsonContent || "{}");
    // thông tin tên thời khóa biểu và lớp
    const infoPairs = [
      {
        label: "Tên thời khóa biểu",
        value: parsedJsonContent.ScheduleName || "Không có thông tin",
      },
      {
        label: "Lớp",
        value: parsedJsonContent.ClassName || "Không có thông tin",
      },
      {
        label: "Ngày áp dụng",
        value: formatDate(parsedJsonContent.DateApplication),
      },
    ];
    const additionalInfo = infoPairs.map((pair, index) => (
      <div style={pairStyle} key={index} className="addInfo">
        <span>{pair.label}:</span>
        <span>{pair.value}</span>
      </div>
    ));
    console.log("timeTables:", timeTables);

    if (!parsedJsonContent || !parsedJsonContent.JsContent) {
      console.error("Không có thông tin thời khóa biểu.");
      return null;
    }
    const jsContent = parsedJsonContent.JsContent?.map((item) => {
      const GuiId = timeTable.guid;
      console.log("Id dung de xet: " + GuiId);

      return (
        <Fragment key={GuiId}>
          <div style={pairStyle} className="">
            <span className="time-day">* {item.split(":")[0]}:</span>
          </div>

          {item.split(": ")[1] !== "Ngày nghỉ" ? (
            <div className="sub-content">
              {JSON.parse(item.split(": ")[1]).map((i) => {
                console.log("Du lieu tra ve", i);
                return (
                  <Fragment key={i.Guid}>
                    <br />
                    <div className="weekdays">
                      <div className="label-value">
                        <label htmlFor="">Tên tiết:</label>
                        <span>{i.SectionName}</span>
                      </div>
                      <div className="label-value">
                        <label htmlFor="">Thời gian:</label>
                        <span className="f-r">
                          {formatTime(i.StartTime)} - {formatTime(i.EndTime)}
                        </span>
                      </div>
                      <div className="label-value">
                        <label htmlFor="">Giáo viên:</label>
                        {i.TeacherName.map((teacher, index) => (
                          <React.Fragment key={teacher}>
                            {index > 0 && ", "}
                            <span className="f-r">{teacher}</span>
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="label-value">
                        <label htmlFor="">Phòng:</label>
                        <span className="" key={i.RoomName}>
                          {i.RoomName}
                        </span>
                      </div>
                    </div>
                    <br />
                  </Fragment>
                );
              })}
            </div>
          ) : (
            <p className="">
              <span className="day-off">{item.split(": ")[1]}</span>
            </p>
          )}
        </Fragment>
      );
    });

    return [...additionalInfo, ...jsContent];
  };

  //Notice
  // Tạo một hàm để đếm số lượng thông báo chưa đọc
  const countUnseen = () => {
    const unseenRegs = timeTables.filter(
      (timeTable) => !isChecked[timeTable.guid]
    );
    setUnseenCount(unseenRegs.length);
  };
  useEffect(() => {
    countUnseen();
  }, [timeTables, isChecked]);
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
  const handleItemClick = (timeTable) => {
    const newIsChecked = { ...isChecked };
    const currentState = isChecked[timeTable.guid];
    const newCheckedState =
      currentState === undefined || currentState === false ? true : true;

    newIsChecked[timeTable.guid] = newCheckedState;

    if (!newCheckedState) {
      // Nếu trạng thái là false (chưa được xem), giảm biến đếm đi 1
      setUnseenCount((prevCount) => prevCount - 1);
    } else {
      // Nếu trạng thái là true (đã được xem), tăng biến đếm lên 1
      setUnseenCount((prevCount) => prevCount + 1);
    }

    saveCheckedState(newIsChecked, () => {
      setModalVisible(true);
      setSelectedTime(timeTable);
      // Gửi trạng thái checked lên server khi thông báo được click
      sendCheckedStateToServer(timeTable.guid, newCheckedState);
      countUnseen(); // Gọi lại hàm đếm số lượng thông báo chưa đọc
    });
  };
  //end notice

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
  
  const handleOnlickGetYear = () => {
    if (selectedYear) {
      console.log("Năm đã chọn:", selectedYear);
    } else {
      console.error("Chưa chọn tháng");
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
                closeOnSelect ={true}
              >
                {genTestData("key1", 12, "Tháng",currentMonth).map((option) => (
                  <Option
                    key={option.value}
                    value={option.value}
                    title={option.displayName}
                    close
                  >
                    {option.displayName}
                  </Option>
                ))}
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
                closeOnSelect ={true}
              >
                {getYear("key2020", 2050, "Năm", currentYear).map((option) => (
                  <Option
                    key={option.value}
                    value={option.value}
                    title={option.displayName}
                    onClick= {handleOnlickGetYear}
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
          Danh sách thời khóa biểu theo tháng
        </Text.Title>
      </Box>
      {timeTables.length === 0 ? (
        <div className="text-student">Hiện tại không có thời khóa biểu nào ?</div>
      ) : (
        <List>
          {timeTables.map((timeTable, index) => (
            <Item
              key={timeTable.guid}
              title={timeTable.title}
              prefix={<Icon icon="zi-calendar" />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => handleItemClick(timeTable)}
              className={isChecked[timeTable.guid] ? "checked" : ""}
            />
          ))}
        </List>
      )}
      <Modal
        visible={modalVisible}
        title="Thời khóa biểu"
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
        {timeTables.length > 0 && (
          <Box className="space-y-4">
            <React.Fragment>
              {selectedTime && (
                <React.Fragment>
                  {formatTimetable(selectedTime)
                    .flat()
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </React.Fragment>
              )}
            </React.Fragment>
          </Box>
        )}
      </Modal>
    </Page>
  );
};

export default TimeTable;
