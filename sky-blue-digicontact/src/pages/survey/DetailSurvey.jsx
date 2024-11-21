import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  Page,
  Text,
  Box,
  Swiper,
  Input,
  Checkbox,
  Button
} from "zmp-ui";
import "../../css/survey/home.css";

const DetailSurvey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, studentGuid, phoneNumber} = location.state || {};
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleAnonymousChange = (event) => {
    const checked = event.target.checked;
    setIsAnonymous(checked);
  };

  const handelSubmitSurvey = () => {
    navigate("/detailhome");
  };

  console.log("Infomation post API: ", username, studentGuid, phoneNumber);
  return (
    <Page className="detail-survey">
      <Box mt={2} className="header-survey">
        <Swiper>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="/images/ileader_1.jpg"
              alt="slide-1"
            />
          </Swiper.Slide>
        </Swiper>
      </Box>
      <Box mt={2}>
        <Text.Title className="title-survey"> Khảo sát A</Text.Title>
      </Box>
      <Box mt={2} className="content-survey">
        <Input.TextArea placeholder="nhập nội dung..."></Input.TextArea>
      </Box>
      <Box mt={2}>
        <Checkbox 
          size="small" 
          label="Chế độ ẩn danh"
          onChange={handleAnonymousChange}
        />
      </Box>
      <Box mt={2}>
        <Button 
          className="btn-survey"
          onClick={handelSubmitSurvey}
        >
          Phản hồi
        </Button>
      </Box>
    </Page>
  );
};

export default DetailSurvey;
