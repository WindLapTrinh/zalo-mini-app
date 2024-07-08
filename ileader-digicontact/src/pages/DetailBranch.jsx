import React, { useState, useEffect, useRef } from "react";
import {
  Page,
  List,
  Icon,
  Modal,
  Swiper,
  Text,
  Box,
  Button,
  BottomNavigation,
  Sheet,
  useTheme,
} from "zmp-ui";
import { configAppView } from "zmp-sdk/apis";
import "../css/detailBranch.css";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const DetailBranch = (props) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [vDialogVisible, setVDialogVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    configAppView({
      headerColor: "#8861bb",
      statusBarColor: "#8861bb",
      headerTextColor: "white",
      hideAndroidBottomNavigationBar: true,
      hideIOSSafeAreaBottom: true,
      actionBar: {
        title: "Chi tiết chi nhánh",
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

  //Address
  const address =
    "296/3 Nơ Trang Long, Phường 12, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam";
  const apiKey =
    "!1m18!1m12!1m3!1d3918.9277940087895!2d106.69579307451765!3d10.816837758448077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ec98ac59ef%3A0xe55a4f47c7711739!2zMjk2LzMgTsahIFRyYW5nIExvbmcsIFBoxrDhu51uZyAxMiwgQsOsbmggVGjhuqFuaCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1704776219799!5m2!1svi!2s";

  //navbar
  const openChatScreen = () => {
    openChat({
      type: "oa",
      id: "3999529157940989049",
      message: "Xin Chào",
      success: () => {
        console.log("Gọi API mở tin nhắn thành công");

        axios
          .post("https://miniapp.ileader.vn/api/Test", {
            message: "Xin Chào từ Zalo",
          })
          .then((response) => {
            console.log("Gửi thông điệp lên server thành công", response.data);
          })
          .catch((error) => {
            console.error("Lỗi khi gửi thông điệp lên server", error);
          });
      },
      fail: (err) => {
        console.error("Gọi API mở tin nhắn thất bại", err);
      },
    });
  };
  const handleListBillonClick = () => {
    navigate("/ListBill");
  };
  const handleNotificationClick = () => {
    interactOA({
      oaId: "3999529157940989049",
      success: (res) => {
        console.log("Interact OA success:", res);
      },
      fail: (err) => {
        console.error("Interact OA error:", err);
      },
    });
  };
  return (
    <Page className="section-container">
      <Text.Title size="small" className="text-branch">
        <Icon icon="zi-location" />
        Quận 1 - 31 Nguyễn Đình Chiểu
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
              src="/images/ileader_2.png"
              alt="slide-1"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/ileader_1.jpg"
              alt="slide-2"
            />
          </Swiper.Slide>
        </Swiper>
      </Box>
      <Text.Title size="small" className="">
        Lịch học
      </Text.Title>
      <Box mt={6}>
        <div className="sum-school">
          <Icon icon="zi-clock-1" />
          <p className="house-school">08:00 - 20:00(Thứ 2 - Thứ 7)</p>
        </div>
        <div className="sum-school">
          <Icon icon="zi-clock-1" />
          <p className="house-school">08:00 - 16:00(Chủ)</p>
        </div>

        <p>Buỗi trưa nghỉ giải lao 1 tiếng, quay lại học lúc 1h chiều</p>
      </Box>
      <Box mt={6}>
        <Text.Title size="small" className="text-branch">
          <p className="text-hotline">
            {" "}
            Hotline liên hệ: <b>19008098</b>
          </p>
          <br />
        </Text.Title>
      </Box>
      <Box mt={6}>
        <Text.Title size="small" className="text-branch">
          <Icon icon="zi-location" />
          Quận 1 - 31 Nguyễn Đình Chiểu
        </Text.Title>
        <iframe
          title="Company Map"
          width="330"
          height="150"
          frameBorder="0" // Thay đổi từ 'frameborder' thành 'frameBorder'
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed?pb=${encodeURIComponent(
            address
          )}&key=${apiKey}`}
          allowFullScreen // Để giữ nguyên
        ></iframe>
      </Box>
      <Box mt={6}>
        <Text.Title className="text-title">Hệ thống Trung Tâm SLK</Text.Title>
        <Text.Title className="text-detail">
          Chi nhánh trung tâm Quận 1 với 1000 học viên đã hoạt động trong vòng
          10 năm với độ uy tích trên thị trường dạy tiếng anh ở Việt Nam. Còn
          trần trừ gì nữa mà không đăng ký cho con em mình học ở ngay trung tâm
          quận 1
        </Text.Title>
      </Box>
      <Box mt={6} className="oder-book">
        <Button
          className="btn-book"
          variant="secondary"
          fullWidth
          onClick={() => {
            setPopupVisible(true);
          }}
        >
          Đăng ký ngay
        </Button>
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
          label="Hóa đơn"
          key="contact"
          icon={<Icon icon="zi-calendar" />}
          activeIcon={<Icon icon="zi-calendar-solid" />}
          onClick={handleListBillonClick}
        />

        <BottomNavigation.Item
          key="timeline"
          label="Thông báo"
          icon={<Icon icon="zi-clock-1" />}
          activeIcon={<Icon icon="zi-clock-1-solid" />}
          onClick={handleNotificationClick}
        />
        <BottomNavigation.Item
          key="me"
          label="Học vụ"
          icon={<Icon icon="zi-user" />}
          activeIcon={<Icon icon="zi-user-solid" />}
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
              text: "Thời khóa biểu",
              onClick: () => {
                navigate("/TimeTable");
              },
            },
            {
              text: "Bảng điểm",
              onClick: () => {
                navigate("/transcript");
              },
            },
            {
              text: "Điểm danh",
              onClick: () => {
                navigate("/dayscorses");
              },
            },
          ],
          [{ text: "Thoát", close: true }],
        ]}
      />
      <Modal
        visible={popupVisible}
        title="Chức năng đang phát triển"
        coverSrc= {"/images/update.png"}
        onClose={() => {
          setPopupVisible(false);
        }}
        verticalActions
      >

        <Box p={6}>
          <Button
            className="btn-submit"
            onClick={() => {
              setPopupVisible(false);
            }}
            fullWidth
          >
            Xác nhận
          </Button>
        </Box>
      </Modal>
    </Page>
  );
};
export default DetailBranch;
