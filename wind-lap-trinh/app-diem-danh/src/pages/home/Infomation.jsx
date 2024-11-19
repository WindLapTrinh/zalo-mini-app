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
          Trung Tâm Ngoại Ngữ Hoàng Anh
        </Text.Title>
      </Box>
      <Text.Title className="description-infomation-home">
        Trung tâm Ngoại ngữ Hoàng Anh là một địa chỉ giáo dục uy tín tại Quảng
        Ngãi với nhiều năm liền được Sở Giáo dục, Trung tâm Khảo thí quốc tế
        Cambridge, IELTS IDP Vietnam công nhận là Trung tâm Ngoại ngữ TOP đầu
        trong việc đào tạo năng lực tiếng Anh cho các thế hệ học sinh. Được
        thành lập vào năm 2011 đến nay, với sứ mệnh "đồng hành cũng các con trên
        từng chặng đường học tập & phát triển năng lực tiếng Anh" và triết lý
        "Lấy tử tế làm định hướng- Lấy giá trị làm thước đo - Lấy bền vững làm
        động lực", chúng tôi khẳng định rằng Trung tâm sẽ luôn vì chữ "Tâm &
        Tín" đem đến giá trị thật sự cho các con học sinh.
      </Text.Title>
    </Box>
  );
};

export default Infomation;
