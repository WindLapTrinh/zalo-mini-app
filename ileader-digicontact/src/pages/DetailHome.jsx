import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  setNavigationBarTitle,
  getUserInfo,
  interactOA,
  openChat,
  followOA,
} from "zmp-sdk/apis";
import {
  BottomNavigation,
  Box,
  Icon,
  Page,
  Sheet,
  Swiper,
  Text,
  useTheme,
} from "zmp-ui";
import axios from "axios";
import "../css/detailHome.css";
import { axiosClient } from "../configs/axios.js";

const DetailHome = (props) => {
  const location = useLocation();
  const { studentName, studentGuid } = location.state || {};
  const { title, back } = props;
  const pageRef = useRef(null);
  const [theme] = useTheme();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("chat");
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [actionSheetAcount, setActionSheetAcount] = useState(false);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalAccountTants, setTotalAccountTants] = useState(0);
  const [totalAcademics, setTotalAcademics] = useState(0);
  const [totalRegisters, setTotalRegisters] = useState(0);
  const [totalTuitions, setTotalTuitions] = useState(0);
  const [totalSchedules, setTotalSchedules] = useState(0);
  const [totalTranscripts, setTotalTranscripts] = useState(0);
  const [totalAttendances, setTotalAttendances] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { userInfo } = await getUserInfo({});
        setUserInfo(userInfo);
        console.log(userInfo);
      } catch (error) {
        console.error("Lỗi khi gọi API getUserInfo:", error);
      }
    };

    // Gọi hàm fetchUserInfo khi component được mount
    fetchUserInfo();
  }, []);

  // Call API configAppView
  useEffect(() => {
    const fetchData = async () => {
      try {
        await setNavigationBarTitle({
          title: studentName,
          success: (res) => {
            console.log("Thiết lập tiêu đề thành công:", res);
          },
          fail: (error) => {
            console.error("Lỗi khi thiết lập tiêu đề:", error);
          },
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchData();
  }, [studentName]);

  console.log("StudenGuiId:", studentGuid);

  //Count Notice SK
  useEffect(() => {
    const fetchEnVent = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/CountNotSeenEvent?guidStudent=${studentGuid}`
        );
        const eventData = response.data.data;
        // Kiểm tra xem eventData có phải là một số không
        if (typeof eventData === "number") {
          // Cập nhật state với tổng số sự kiện
          setTotalEvents(eventData);
        } else {
          console.error("Dữ liệu sự kiện không hợp lệ:", eventData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
      }
    };
    fetchEnVent();
  }, [studentGuid]);

  //Count accountant
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/CountNotSeenAccounting?guidStudent=${studentGuid}`
        );
        const accountData = response.data.data;
        // Kiểm tra xem eventData có phải là một số không
        if (typeof accountData === "number") {
          // Cập nhật state với tổng số sự kiện
          setTotalAccountTants(accountData);
        } else {
          console.error("Dữ liệu sự kiện không hợp lệ:", accountData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
      }
    };
    fetchAccount();
  }, [studentGuid]);

  //Count Academic
  useEffect(() => {
    const fetchAcademic = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/CountNotSeenEducation?guidStudent=${studentGuid}`
        );
        const academicData = response.data.data;
        // Kiểm tra xem eventData có phải là một số không
        if (typeof academicData === "number") {
          // Cập nhật state với tổng số sự kiện
          setTotalAcademics(academicData);
        } else {
          console.error("Dữ liệu sự kiện không hợp lệ:", academicData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
      }
    };
    fetchAcademic();
  }, [studentGuid]);

  //Count CountNotSeenRegister
  useEffect(() => {
    const fetchRegister = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/CountNotSeenRegister?guidStudent=${studentGuid}`
        );
        const regData = response.data.data;
        // Kiểm tra xem eventData có phải là một số không
        if (typeof regData === "number") {
          // Cập nhật state với tổng số sự kiện
          setTotalRegisters(regData);
        } else {
          console.error("Dữ liệu sự kiện không hợp lệ:", regData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
      }
    };
    fetchRegister();
  }, [studentGuid]);

  //Count Tuition
  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/CountNotSeenTuition?guidStudent=${studentGuid}`
        );
        const tuitionData = response.data.data;
        // Kiểm tra xem eventData có phải là một số không
        if (typeof tuitionData === "number") {
          // Cập nhật state với tổng số sự kiện
          setTotalTuitions(tuitionData);
        } else {
          console.error("Dữ liệu sự kiện không hợp lệ:", tuitionData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
      }
    };
    fetchTuition();
  }, [studentGuid]);

  //Count schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/CountNotSeenSchedule?guidStudent=${studentGuid}`
        );
        const scheduleData = response.data.data;
        // Kiểm tra xem eventData có phải là một số không
        if (typeof scheduleData === "number") {
          // Cập nhật state với tổng số sự kiện
          setTotalSchedules(scheduleData);
        } else {
          console.error("Dữ liệu sự kiện không hợp lệ:", scheduleData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
      }
    };
    fetchSchedule();
  }, [studentGuid]);

  //Count transcript
  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/CountNotSeenTranscript?guidStudent=${studentGuid}`
        );
        const transcriptData = response.data.data;
        // Kiểm tra xem eventData có phải là một số không
        if (typeof transcriptData === "number") {
          // Cập nhật state với tổng số sự kiện
          setTotalTranscripts(transcriptData);
        } else {
          console.error("Dữ liệu sự kiện không hợp lệ:", transcriptData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
      }
    };
    fetchTranscript();
  }, [studentGuid]);

  //Count attendance
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/CountNotSeenAttendance?guidStudent=${studentGuid}`
        );
        const attendanceData = response.data.data;
        // Kiểm tra xem eventData có phải là một số không
        if (typeof attendanceData === "number") {
          // Cập nhật state với tổng số sự kiện
          setTotalAttendances(attendanceData);
        } else {
          console.error("Dữ liệu sự kiện không hợp lệ:", attendanceData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
      }
    };
    fetchAttendance();
  }, [studentGuid]);

  const handleListBillonClick = () => {
    console.log("Navigating to ListBill with studentGuid:", studentGuid);
    navigate("/Notice", { state: { studentGuid } });
  };

  const handdleFillterStudentClick = () => {
    navigate("/fillterstudent", {sate: { studentGuid } });
  }

  const openChatScreen = async () => {
    try {
      await openChat({
        type: "oa",
        id: "3999529157940989049",
        message: "Xin Chào",
        success: async () => {
          try {
            const res = await axiosClient.post(
              "https://miniapp.ileader.vn/api/Test",
              {
                message: "Xin chào từ Zalo",
              },
              {
                timeout: 5000,
              }
            );
            console.log(res);
          } catch (error) {
            console.error("Error sending message to server:", error);
          }
        },
        fail: (err) => {
          console.error("Failed to open chat:", err);
        },
      });
    } catch (error) {
      console.error("Error opening chat:", error);
    }
  };

  const registerOnLick = () => {
    console.log("Navigating to ListBill with studentGuid:", studentGuid);
    navigate("/register", { state: { studentGuid } });
  };

  return (
    <Page className="container plc-action">
      <Text.Title size="small" className="text-title">
        Trung Tâm Giáo Dục SLK Solutions
      </Text.Title>
      <Box
        mt={6}
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Swiper>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/ileader_1.jpg"
              alt="slide-1"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/ileader_2.png"
              alt="slide-2"
            />
          </Swiper.Slide>
        </Swiper>
      </Box>

      <Box mt={6} className="call-admin">
        <a className="link-admin" onClick={openChatScreen}>
          <p className="text-success">
            Bấm vào đây để kết nối với Trung Tâm SLK Solutions!
          </p>
          <Icon className="icon-admin" icon="zi-user-window-solid" />
        </a>
      </Box>
      <Box mt={6} className="call-register" onClick={registerOnLick}>
        <a className="form-register">
          <div className="icon-left">
            <a>
              <Icon className="icon-register" icon="zi-calendar-solid" />
            </a>
            <p className="text-icon ">Đăng ký học viên</p>
          </div>
          <div className="icon-right">
            <Icon className="icon-user" icon="zi-user-solid" />
            <p className="text-icon ">Học viên</p>
          </div>
        </a>
      </Box>
      <Box mt={6}>
        <Text.Title className="text-title">
          Hệ thống trung tâm SLK Solutions
        </Text.Title>
        <Text.Title className="text-detail">
          iLeader cung cấp cho trung tâm ngoại ngữ công cụ hỗ trợ vận hành trung
          tâm hiệu quả nhất, tất cả các đầu công việc được vận hành trên phần
          mềm, lưu trữ và tra cứu thông tin nhanh chóng, giúp nhân sự tiết kiệm
          thời gian và giảm sai sót trong công việc. Từ đó giúp trung tâm tập
          trung và việc nâng cao chất lượng dịch vụ để phát triển hệ thống trung
          tâm, mở rộng quy mô và phát triển.
        </Text.Title>
      </Box>

      <BottomNavigation
        fixed
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        style={{ marginTop: "56px" }}
      >
        <BottomNavigation.Item
          key="chat"
          label="Tin Nhắn"
          icon={<Icon icon="zi-chat" />}
          activeIcon={<Icon icon="zi-chat-solid" />}
          onClick={openChatScreen}
        />
        <BottomNavigation.Item
          label="Sự kiện"
          key="contact"
          icon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-clock-1" />
              {totalEvents > 0 && (
                <div className="red-circle">{totalEvents}</div>
              )}
            </div>
          }
          activeIcon={<Icon icon="zi-clock-1-solid" />}
          onClick={() => {
            handleListBillonClick(studentGuid);
          }}
        />

        <BottomNavigation.Item
          key="timeline"
          label="Kế toán"
          icon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-calendar" />
              {totalAccountTants > 0 && (
                <div className="red-circle">{totalAccountTants}</div>
              )}
            </div>
          }
          activeIcon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-calendar-solid" />
              {totalAccountTants > 0 && (
                <div className="red-circle">{totalAccountTants}</div>
              )}
            </div>
          }
          onClick={() => {
            setActionSheetAcount(true);
          }}
        />
        <BottomNavigation.Item
          key="me"
          label="Học vụ"
          icon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-user" />
              {totalAcademics > 0 && (
                <div className="red-circle">{totalAcademics}</div>
              )}
            </div>
          }
          activeIcon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-user-solid" />
              {totalAcademics > 0 && (
                <div className="red-circle">{totalAcademics}</div>
              )}
            </div>
          }
          onClick={() => {
            setActionSheetVisible(true);
          }}
        />
      </BottomNavigation>
      <Sheet.Actions
        mask
        visible={actionSheetVisible}
        title="Phụ huynh có thể vào đây xem thông tin học sinh"
        onClose={() => setActionSheetVisible(false)}
        swipeToClose
        actions={[
          [
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Thời khóa biểu</span>
                  {totalSchedules > 0 && (
                    <div className="red-box-notice">{totalSchedules}</div>
                  )}
                </div>
              ),
              onClick: () => {
                navigate("/TimeTable", { state: { studentGuid } });
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Bảng điểm</span>
                  {totalTranscripts > 0 && (
                    <div className="red-box-notice">{totalTranscripts}</div>
                  )}
                </div>
              ),
              onClick: () => {
                navigate("/transcript", {
                  state: { studentName, studentGuid },
                });
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Điểm danh</span>
                  {totalAttendances > 0 && (
                    <div className="red-box-notice">{totalAttendances}</div>
                  )}
                </div>
              ),
              onClick: () => {
                navigate("/dayscorses", { state: { studentGuid } });
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Lộ trình học tập</span>
                  {totalAttendances > 0 && (
                    <div className="red-box-notice">{totalAttendances}</div>
                  )}
                </div>
              ),
              onClick: () => {
                navigate("/routerstudent", { state: { studentGuid } });
              },
            },
          ],
          [{ text: "Thoát", close: true }],
        ]}
      />

      {/* //Acount  */}
      <Sheet.Actions
        mask
        visible={actionSheetAcount}
        title="Vào đây xem thông tin thiếu đăng ký và học phí"
        onClose={() => setActionSheetAcount(false)}
        swipeToClose
        actions={[
          [
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Phiếu thu học phí</span>
                  {totalTuitions > 0 && (
                    <span className="red-box-notice">{totalTuitions}</span>
                  )}
                </div>
              ),
              onClick: () => {
                navigate("/account", { state: { studentGuid } });
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Phiếu thu đăng ký</span>
                  {totalRegisters > 0 && (
                    <div className="red-box-notice">{totalRegisters}</div>
                  )}
                </div>
              ),
              onClick: () => {
                navigate("/reg", { state: { studentGuid, studentName } });
              },
            },
          ],
          [{ text: "Thoát", close: true }],
        ]}
      />
    </Page>
  );
};

export default DetailHome;
