import React, { useEffect, useRef } from "react";
import { Page, Box, Button, Text, Icon, Swiper } from "zmp-ui";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { BsGearFill } from "react-icons/bs";
import "../../css/login/infomation.css";

const Infomation = () => {
  return (
    <Box>
      <Box mt={2} mb={2} className="page-infomation">
        <a className="link-admin">
          <BsShieldFillCheck className="icphone-login" />
          <span className="text-success">Thông tin được bảo mật</span>
          <img
            className="logo-infomation"
            src="./images/icon/logo-tim.png"
            alt="logo"
          />
        </a>
        <a className="link-admin">
          <BsGearFill className="icphone-login" />
          <span className="text-success">
            Thông tin sẽ được cập nhật thường xuyên.
          </span>
        </a>
        <a className="link-admin">
          <FaPhone className="icphone-login" />
          <span className="text-success">
            Cung cấp số điện thoại đã đăng ký học viên tại trung tâm.
          </span>
        </a>
      </Box>
    </Box>
  );
};

export default Infomation;
