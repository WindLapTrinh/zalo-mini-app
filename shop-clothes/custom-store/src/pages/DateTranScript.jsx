import React, { useState, useEffect, Fragment } from "react";
import { Page, List, Icon, Modal, Box, Text, Select } from "zmp-ui";
import { useLocation } from "react-router-dom";
import { configAppView } from "zmp-sdk/apis";
import axios from "axios";
import * as dateFns from "date-fns";
import "../css/transcript.css";
import "../css/detailHome.css";

const { format } = dateFns;
const { Item } = List;

//style  để định dạng cặp thông tin
const pairStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "-15px",
};

const TranScript = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTranScrpit, setSelectedTranScrpit] = useState(null);
  const [titleTranscript, setTitleTranscript] = useState(""); // New state for titleTranscript
  const location = useLocation();

  const { studentName, studentGuid, currentDate } = location.state || {};
  console.log("Ten hoc sinh phan abng diem:", studentName);
  console.log("StudenGuiId:", studentGuid);
  const [tranScripts, settranScripts] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0); // Biến đếm số lượng thông báo chưa được xem
  const [isLoading, setIsLoading] = useState(true); // Thêm state để kiểm tra trạng thái tải dữ liệu
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
        title: "Bảng điểm của học sinh",
        leftButton: "back",
      },
      success: (res) => {
        console.log("Goi thanh cong");
      },
      fail: (error) => {
        console.log(error);
      },
    });
    setCurrentYear(new Date().getFullYear());
    serCurrentMonth(new Date().getMonth() + 1);
  }, []);

  useEffect(() => {
    const fetchTranScript = async () => {
      try {
        let apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=BĐ&guidStudent=${studentGuid}`;

        if (currentDate) {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const formattedYear = year.toString();
          const formattedMonth = month < 10 ? `0${month}` : month.toString();
          apiUrl += `&month=${formattedMonth}&year=${formattedYear}`;
          console.log(apiUrl);
        }

        if (currentDate || (currentMonth && currentYear)) {
          apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=BĐ&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
          console.log(apiUrl);
        }
        if (selectedMonth && selectedYear) {
          apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=BĐ&guidStudent=${studentGuid}&month=${selectedMonth}&year=${selectedYear}`;
          console.log(apiUrl);
        } else if (selectedMonth || selectedYear == null) {
          if (selectedMonth != null) {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=BĐ&guidStudent=${studentGuid}&month=${selectedMonth}&year=${currentYear}`;
            console.log(apiUrl);
          } else {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=BĐ&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
            console.log(apiUrl);
          }
        } else {
          if (selectedYear != null) {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=BĐ&guidStudent=${studentGuid}&month=${currentMonth}&year=${selectedYear}`;
            console.log(apiUrl);
          } else {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=BĐ&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
            console.log(apiUrl);
          }
        }
        const response = await axios.get(apiUrl);
        settranScripts(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      } finally {
        setIsLoading(false); // Đánh dấu rằng đã tải xong dữ liệu
      }
    };
    // Gọi hàm để lấy danh sách hóa đơn
    fetchTranScript();
  }, [studentGuid, currentDate, selectedMonth, selectedYear]);

  useEffect(() => {
    const loadCheckedState = () => {
      const storedCheckedState = localStorage.getItem("isChecked");
      if (storedCheckedState) {
        setIsChecked(JSON.parse(storedCheckedState));
      }
    };

    loadCheckedState();
  }, []);

  const formatTranScript = (tranScript) => {
    if (!tranScript || !tranScript.jsonContent) return null; // Kiểm tra tranScript có tồn tại và có thuộc tính jsonContent không
    const parsedJsonContent = JSON.parse(tranScript.jsonContent);
    console.log("Account object:", tranScript);

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const parsedDate = new Date(dateString);
      return format(parsedDate, "dd/MM/yyyy");
    };
    const detailItems = parsedJsonContent.Details.map((detail, index) => (
      <div key={index}>
        <span>{detail.ColumName}:</span>
        <span className="fr-studentName">{detail.ColumnContent}</span>
      </div>
    ));

    return (
      <Fragment>
        {studentName && (
          <div>
            <span>Tên học sinh:</span>
            <span className="fr-studentName">{studentName}</span>
          </div>
        )}
        {detailItems}
      </Fragment>
    );
  };

  //Notice
  // Tạo một hàm để đếm số lượng thông báo chưa đọc
  const countUnseen = () => {
    const unseenRegs = tranScripts.filter(
      (tranScript) => !isChecked[tranScript.guid]
    );
    setUnseenCount(unseenRegs.length);
  };
  useEffect(() => {
    countUnseen();
  }, [tranScripts, isChecked]);

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
  const handleItemClick = (tranScript) => {
    const newIsChecked = { ...isChecked };
    const currentState = isChecked[tranScript.guid];
    const newCheckedState =
      currentState === undefined || currentState === false ? true : true;

    newIsChecked[tranScript.guid] = newCheckedState;

    if (!newCheckedState) {
      setUnseenCount((prevCount) => prevCount - 1);
    } else {
      setUnseenCount((prevCount) => prevCount + 1);
    }

    const parsedJsonContent = JSON.parse(tranScript.jsonContent);
    const titleTranscript = parsedJsonContent.TranscriptName; 
    setTitleTranscript(titleTranscript);

    saveCheckedState(newIsChecked, () => {
      setModalVisible(true);
      setSelectedTranScrpit(tranScript);
      sendCheckedStateToServer(tranScript.guid, newCheckedState);
      countUnseen(); 
    });
  };

  const genTestData = (name, number, prefix = "Tháng") => {
    const data = [];
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
                  setSelectedMonth(value);
                  handleOptionChange(value);
                }}
                closeOnSelect={true}
              >
                {genTestData("key1", 12, "Tháng", currentMonth).map((option) => (
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
          Danh sách bảng điểm theo tháng
        </Text.Title>
      </Box>
      {tranScripts.length === 0 ? (
        <div className="text-student">Hiện tại không có thông tin bảng điểm nào ?</div>
      ) : (
        <List>
          {tranScripts.map((tranScript) => (
            <Item
              key={tranScript.guid}
              title={tranScript.title}
              prefix={<Icon icon="zi-calendar" />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => handleItemClick(tranScript)}
              className={isChecked[tranScript.guid] ? "checked" : ""}
            />
          ))}
        </List>
      )}
      <Modal
        visible={modalVisible}
        title={titleTranscript} 
        onClose={() => {
          saveCheckedState(isChecked);
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
          {selectedTranScrpit && (
            <React.Fragment>
              {[]
                .concat(formatTranScript(selectedTranScrpit))
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

export default TranScript;
