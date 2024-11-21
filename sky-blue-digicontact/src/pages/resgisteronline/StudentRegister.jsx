import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Page, Icon, Swiper, Text, Box, Button} from "zmp-ui";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/registoronline/home.css";

const StudentRegister = (props) => {
  const location = useLocation();

  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //Address
  const address =
    "296/3 Nơ Trang Long, Phường 12, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam";
  const apiKey =
    "!1m18!1m12!1m3!1d3918.9277940087895!2d106.69579307451765!3d10.816837758448077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ec98ac59ef%3A0xe55a4f47c7711739!2zMjk2LzMgTsahIFRyYW5nIExvbmcsIFBoxrDhu51uZyAxMiwgQsOsbmggVGjhuqFuaCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1704776219799!5m2!1svi!2s";
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
        <Text.Title className="text-title">
          Nhà Thiếu Nhi Thành Phố Thành Phố Hồ Chí Minh
        </Text.Title>
        <Text.Title className="text-detail">
          Nhà Truyền thống Đội Thiếu niên Tiền phong Hồ Chí Minh tọa lạc trong
          khuôn viên Tượng Bác Hồ với thiếu nhi tại số 169 Nam Kỳ Khởi Nghĩa,
          Phường Võ Thị Sáu, Quận 3, thành phố Hồ Chí Minh. Đây là nơi lưu giữ
          và trưng bày những hình ảnh, hiện vật gắn với lịch sử của tổ chức Đội
          Thiếu niên Tiền phong Hồ Chí Minh và phong trào thiếu nhi thành phố Hồ
          Chí Minh từ năm 1941 đến nay.
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
      {/* footer bottom  */}
    </Page>
  );
};
export default StudentRegister;
