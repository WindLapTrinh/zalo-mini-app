import React, { useEffect, useRef } from "react";
import { Page, Box, Button, Text, Icon, Swiper } from "zmp-ui";
import { BsShop } from "react-icons/bs";
import "../../css/home/infomation.css";

const Infomation = () => {
  return (
    <Box mt={2} className="page-infomation-home">
      <Box className="header-infomation-home">
        <BsShop className="icon-infomation-home" />
        <Text.Title className="title-infomation-home">
        Học viện bóng đá quốc tế Blue sky VFF
        </Text.Title>
      </Box>
      <Text.Title className="description-infomation-home">
        Học viện Bóng đá Blue Sky VFF là trung tâm bóng đá cộng đồng số 1 tại
        thủ đô Hà Nội. Với phương châm " Ươm mầm tài năng trẻ".Tại đây, chúng
        tôi không chỉ dẫn đầu trong lĩnh vực đào tạo bóng đá mà còn tạo nên tính
        kỷ luật- tinh thần đồng - kết nối bạn bè cho mỗi học viên. Với đội ngũ
        huấn luyện viên giàu kinh nghiệm, Blue Sky VFF chia sẻ những bài giảng
        và kỹ thuật chơi bóng chuyên nghiệp, giúp các tài năng trẻ Việt Nam phát
        triển toàn diện và tự tin vươn tầm quốc tế.
      </Text.Title>
    </Box>
  );
};

export default Infomation;
