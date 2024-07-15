import React, { useState, useEffect, Fragment } from "react";
import { Page, List, Icon, Modal, Box, Text, Button, useNavigate } from "zmp-ui";
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
  const navigate = useNavigate();
  const location = useLocation();

  const { studentName, studentGuid } = location.state || {};
  console.log("Ten hoc sinh phan abng diem:", studentName);
  console.log("StudenGuiId:", studentGuid);
  const [tranScripts, settranScripts] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0); // Biến đếm số lượng thông báo chưa được xem
  const [isLoading, setIsLoading] = useState(true); // Thêm state để kiểm tra trạng thái tải dữ liệu
  const [currentDate, setCurrentDate] = useState(new Date()); // State để lưu ngày hiện tại
  const [titleTranscript, setTitleTranscript] = useState("");
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
  }, []);

  useEffect(() => {
    const fetchTranScript = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/GetListNotifys?msgType=BĐ&guidStudent=${studentGuid}`
        );

        // Cập nhật trạng thái với danh sách hóa đơn từ API
        settranScripts(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      } finally {
        setIsLoading(false); // Đánh dấu rằng đã tải xong dữ liệu
      }
    };
    // Gọi hàm để lấy danh sách hóa đơn
    fetchTranScript();
  }, [studentGuid]);

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
  const handleItemClick = (tranScript) => {
    const newIsChecked = { ...isChecked };
    const currentState = isChecked[tranScript.guid];
    const newCheckedState =
      currentState === undefined || currentState === false ? true : true;

    newIsChecked[tranScript.guid] = newCheckedState;

    if (!newCheckedState) {
      // Nếu trạng thái là false (chưa được xem), giảm biến đếm đi 1
      setUnseenCount((prevCount) => prevCount - 1);
    } else {
      // Nếu trạng thái là true (đã được xem), tăng biến đếm lên 1
      setUnseenCount((prevCount) => prevCount + 1);
    }
    const parsedJsonContent = JSON.parse(tranScript.jsonContent);
    const titleTranscript = parsedJsonContent.TranscriptName; 
    setTitleTranscript(titleTranscript);

    saveCheckedState(newIsChecked, () => {
      setModalVisible(true);
      setSelectedTranScrpit(tranScript);
      // Gửi trạng thái checked lên server khi thông báo được click
      sendCheckedStateToServer(tranScript.guid, newCheckedState);
      countUnseen(); // Gọi lại hàm đếm số lượng thông báo chưa đọc
    });
  };
  //end notice
  
  //date
  const handleClickDate = () => {
    const newCurrentDate = new Date(); // Tạo một ngày mới
    setCurrentDate(newCurrentDate); // Cập nhật state currentDate với ngày mới
    console.log("Ngày hiện tại đã chọn:", newCurrentDate); // In ra ngày hiện tại sau khi cập nhật
    navigate("/datetranscript", {
      state: { studentGuid, currentDate: newCurrentDate },
    }); // Truyền currentDate vào navigate
  };
  //end date

  return (
    <Page className="section-container">
      {/* Hiển thị thông báo tải dữ liệu */}
      {isLoading && <Text>Đang nạp dữ liệu...</Text>}
      {/* Hiển thị thông báo khi không có học viên */}
      {!isLoading && tranScripts.length === 0 && (
        <Text>
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
            Hiện tại không có thông báo bảng điểm nào !
          </div>
        </Text>
      )}
      {!isLoading && tranScripts.length > 0 && (
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
          // Reset checked state when Modal is closed
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
