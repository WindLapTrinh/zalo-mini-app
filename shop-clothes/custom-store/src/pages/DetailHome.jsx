import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  BottomNavigation,
  Box,
  Icon,
  Page,
  Sheet,
  Swiper,
  Text,
  useTheme,
  Header,
  Tabs,
} from "zmp-ui";
import "../css/detailHome.css";

const DetailHome = (props) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat");
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [actionSheetAcount, setActionSheetAcount] = useState(false);

  const openChatScreen = () => {
    console.log("Open Chat Screen");
  };
  return (
    <Page className="container plc-action">
      <Header
        className="app-header no-border pl-4 flex-none pb-[6px]"
        showBackIcon={false}
        title={
          <Box flex alignItems="center" className="space-x-2 pd-2">
            <img
              className="w-8 h-8 rounded-lg border-inset"
              src="/images/logo.png"
            />
            <Box>
              <Text.Title size="small">Wind Lập Trình</Text.Title>
              <br />
              <Text size="xxSmall" className="text-gray col-12">
                Welcome, Nguyễn Thanh Phong!
              </Text>
            </Box>
          </Box>
        }
      />
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
              src="/images/banner-1.jpg"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/banner-4.webp"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/banner-4.webp"
              alt="slide-2"
            />
          </Swiper.Slide>
        </Swiper>
      </Box>

      {/* call api service store */}
      <Box className="service-store">
        <Box className="slider-container bg-white p-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="slider-item flex flex-col space-y-2 items-center"
            >
              <img
                className="w-12 h-12 boder-image"
                src="/images/logo.png"
                alt="Product"
              />
              <Text size="xxSmall" className="text-gray">
                Sản phẩm
              </Text>
            </div>
          ))}
        </Box>
      </Box>

      <Box className="category-product">
        
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
              {/* {totalEvents > 0 && (
                <div className="red-circle">{totalEvents}</div>
              )} */}
            </div>
          }
          activeIcon={<Icon icon="zi-clock-1-solid" />}
        />

        <BottomNavigation.Item
          key="timeline"
          label="Kế toán"
          icon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-calendar" />
              {/* {totalAccountTants > 0 && (
                <div className="red-circle">{totalAccountTants}</div>
              )} */}
            </div>
          }
          activeIcon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-calendar-solid" />
              {/* {totalAccountTants > 0 && (
                <div className="red-circle">{totalAccountTants}</div>
              )} */}
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
              {/* {totalAcademics > 0 && (
                <div className="red-circle">{totalAcademics}</div>
              )} */}
            </div>
          }
          activeIcon={
            <div className="accounting-icon-wrapper">
              <Icon icon="zi-user-solid" />
              {/* {totalAcademics > 0 && (
                <div className="red-circle">{totalAcademics}</div>
              )} */}
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
                  {/* {totalSchedules > 0 && (
                    <div className="red-box-notice">{totalSchedules}</div>
                  )} */}
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
                  {/* {totalTranscripts > 0 && (
                    <div className="red-box-notice">{totalTranscripts}</div>
                  )} */}
                </div>
              ),
              onClick: () => {
                navigate("/transcript", {
                  state: { studentGuid },
                });
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Điểm danh</span>
                  {/* {totalAttendances > 0 && (
                    <div className="red-box-notice">{totalAttendances}</div>
                  )} */}
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
                  {/* {totalAttendances > 0 && (
                    <div className="red-box-notice">{totalAttendances}</div>
                  )} */}
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
                  {/* {totalTuitions > 0 && (
                    <span className="red-box-notice">{totalTuitions}</span>
                  )} */}
                </div>
              ),
              onClick: () => {
                navigate("/account", { state: { studentGuid } });
              },
            },
            {
              text: (
                <div className="accounting-icon-wrapper">
                  <span>Hóa đơn tài chính</span>
                  {/* {totalRegisters > 0 && (
                    <span className="red-box-notice">{totalRegisters}</span>
                  )} */}
                </div>
              ),
              onClick: () => {
                navigate("/finanial", { state: { studentGuid } });
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
