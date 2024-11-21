import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../config/axios";
import { BottomNavigation, Box, Icon, Sheet } from "zmp-ui";
import { openChatScreen } from "../utils/openChatScreen";
import { IoHomeOutline } from "react-icons/io5";
import "../../../css/home/bottomnavigation.css";

const BottomNavigationComponent = ({
  studentGuid,
  studentName,
  phoneNumber,
  
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyTab } = location.state || {};

  const [activeTab, setActiveTab] = useState(keyTab || "home");
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [actionSheetAccount, setActionSheetAccount] = useState(false);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalAccountTants, setTotalAccountTants] = useState(0);
  const [totalAcademics, setTotalAcademics] = useState(0);
  const [totalSchedules, setTotalSchedules] = useState(0);
  const [totalTranscripts, setTotalTranscripts] = useState(0);
  const [totalAttendances, setTotalAttendances] = useState(0);
  const [totalTuitions, setTotalTuitions] = useState(0);
  const [totalRegisters, setTotalRegisters] = useState(0);

  const [currentDate, setCurrentDate] = useState(new Date()); // State để lưu ngày hiện tại

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          axiosClient.get(
            `api/MiniApp/CountNotSeenEvent?guidStudent=${studentGuid}`
          ),
          axiosClient.get(
            `api/MiniApp/CountNotSeenAccounting?guidStudent=${studentGuid}`
          ),
          axiosClient.get(
            `api/MiniApp/CountNotSeenEducation?guidStudent=${studentGuid}`
          ),
          axiosClient.get(
            `api/MiniApp/CountNotSeenSchedule?guidStudent=${studentGuid}`
          ),
          axiosClient.get(
            `api/MiniApp/CountNotSeenTranscript?guidStudent=${studentGuid}`
          ),
          axiosClient.get(
            `api/MiniApp/CountNotSeenAttendance?guidStudent=${studentGuid}`
          ),
          axiosClient.get(
            `api/MiniApp/CountNotSeenTuition?guidStudent=${studentGuid}`
          ),
          axiosClient.get(
            `api/MiniApp/CountNotSeenRegister?guidStudent=${studentGuid}`
          ),
        ]);

        setTotalEvents(responses[0].data.data || 0);
        setTotalAccountTants(responses[1].data.data || 0);
        setTotalAcademics(responses[2].data.data || 0);
        setTotalSchedules(responses[3].data.data || 0);
        setTotalTranscripts(responses[4].data.data || 0);
        setTotalAttendances(responses[5].data.data || 0);
        setTotalTuitions(responses[6].data.data || 0);
        setTotalRegisters(responses[7].data.data || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, [studentGuid]);

  const handleNavigation = (path, keyTab) => {
    navigate(path, { state: { studentGuid, keyTab, studentName } });
    setActiveTab(keyTab);
  };

  const handleSelectDate = (path, keyTab) => {
    const newCurrentDate = new Date(); // Tạo một ngày mới
    setCurrentDate(newCurrentDate); // Cập nhật state currentDate với ngày mới
    
    console.log("Ngày hiện tại đã chọn:", newCurrentDate);

    setActiveTab(keyTab);
    navigate(path, {
      state: {
        studentGuid,
        studentName,
        phoneNumber,
        keyTab,
        currentDate: newCurrentDate,
      },
    });
  };

  return (
    <Box>
      <BottomNavigation
        fixed
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        style={{ marginTop: "56px" }}
      >
        <BottomNavigation.Item
          className={activeTab === "home" ? "icon-active" : ""}
          key="home"
          label="Trang chủ"
          icon={<IoHomeOutline />}
          activeIcon={<IoHomeOutline />}
          onClick={() => handleNavigation("/home", "home")}
        />
        <BottomNavigation.Item
          label="Thông báo"
          className={activeTab === "notify" ? "icon-active" : ""}
          key="notify"
          icon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-clock-1" />
              {totalEvents > 0 && (
                totalEvents > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{totalEvents}</div>
              )}
            </div>
          }
          activeIcon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-clock-1-solid" />
              {totalEvents > 0 && (
                totalEvents > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{totalEvents}</div>
              )}
            </div>
          }
          onClick={() => handleNavigation("/notify", "notify")}
        />
        <BottomNavigation.Item
          className={activeTab === "chat" ? "icon-active" : ""}
          key="chat"
          label="Tin nhắn"
          icon={<Icon icon="zi-chat" />}
          activeIcon={<Icon icon="zi-chat-solid" />}
          onClick={openChatScreen}
        />
        <BottomNavigation.Item
          className={activeTab === "accountant" ? "icon-active" : ""}
          key="accountant"
          label="Kế toán"
          icon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-calendar" />
              {totalAccountTants > 0 && (
                totalAccountTants > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{totalAccountTants}</div>
              )}
            </div>
          }
          activeIcon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-calendar-solid" />
              {totalAccountTants > 0 && (
                totalAccountTants > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{totalAccountTants}</div>
              )}
            </div>
          }
          onClick={() => setActionSheetAccount(true)}
        />
        <BottomNavigation.Item
          className={activeTab === "education" ? "icon-active" : ""}
          key="education"
          label="Học vụ"
          icon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-user" />
              {totalAcademics > 0 && (
                totalAcademics > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{totalAcademics}</div>
              )}
            </div>
          }
          activeIcon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-user-solid" />
              {totalAcademics > 0 && (
                totalAcademics > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{totalAcademics}</div>
              )}
            </div>
          }
          onClick={() => setActionSheetVisible(true)}
        />
      </BottomNavigation>

      <Sheet.Actions
        mask
        visible={actionSheetVisible}
        title="Xem thông báo học vụ của bạn"
        onClose={() => setActionSheetVisible(false)}
        swipeToClose
        actions={[
          [
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span className="title-header-sheet">Thời khóa biểu</span>
                  {totalSchedules > 0 && (
                    // <div className="red-box-notice">{totalSchedules}</div>
                    totalSchedules > 9 ? <div className="full-box-notice">9+</div> : <div className="red-box-notice">{totalSchedules}</div>
                  )}
                </div>
              ),
              onClick: () => {
                handleSelectDate("/timetable", "education");
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span className="title-header-sheet">Bảng điểm</span>
                  {totalTranscripts > 0 && (
                    totalTranscripts > 9 ? <div className="full-box-notice">9+</div> : <div className="red-box-notice">{totalTranscripts}</div>
                  )}
                </div>
              ),
              onClick: () => {
                handleSelectDate("/transcript", "education");
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span className="title-header-sheet">Điểm danh</span>
                  {totalAttendances > 0 && (
                    totalAttendances > 9 ? <div className="full-box-notice">9+</div> : <div className="red-box-notice">{totalAttendances}</div>
                  )}
                </div>
              ),
              onClick: () => {
                handleSelectDate("/rollcall", "education");
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span className="title-header-sheet">Lộ trình học tập</span>
                </div>
              ),
              onClick: () => { handleSelectDate("/routerstudent", "education")},
            },
            
          ],
          [{ text: "Thoát", close: true }],
        ]}
      />

      {/* ke toan  */}
      <Sheet.Actions
        mask
        visible={actionSheetAccount}
        title="Xem thông báo kế toán của bạn"
        onClose={() => setActionSheetAccount(false)}
        swipeToClose
        actions={[
          [
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Phiếu thu học phí</span>
                  {totalTuitions > 0 && (
                    totalTuitions > 9 ? <div className="full-box-notice">9+</div> : <div className="red-box-notice">{totalTuitions}</div>
                  )}
                </div>
              ),
              onClick: () => {
                handleSelectDate("/tuitionFees", "accountant");
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Phiếu đăng ký</span>
                  {totalRegisters > 0 && (
                    totalRegisters > 9 ? <div className="full-box-notice">9+</div> : <div className="red-box-notice">{totalRegisters}</div>
                  )}
                </div>
              ),
              onClick: () => {
                handleSelectDate("/register", "accountant");
              },
            },
          ],
          [{ text: "Thoát", close: true }],
        ]}
      />
    </Box>
  );
};

export default BottomNavigationComponent;
