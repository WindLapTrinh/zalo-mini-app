import React, { useEffect, useRef } from "react";
import { Page, Box, Button, Text, Icon, Swiper } from "zmp-ui";

import "../../css/login/security.css";

const Infomation = () => {
  return (
      <Box mt={4} className="page-security">
        <Text className="error-security" size="xSmall">
          <Icon className="zi-warning" icon="zi-warning" />Chính sách bảo mật
        </Text>
      </Box>
  );
};

export default Infomation;
