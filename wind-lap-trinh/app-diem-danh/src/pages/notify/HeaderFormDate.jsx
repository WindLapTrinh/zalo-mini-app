import React from 'react';
import { Box, Select, Text } from 'zmp-ui';

const HeaderFormDate = () => {
  return (
    <Box>
      <div className="header-form-date">
        <img
          className="img-header-form"
          src="./images/icon/icon-select-date.png"
        />
        <Text className="title-header-form">Chọn mốc thời gian</Text>
      </div>
    </Box>
  );
};
export default HeaderFormDate;
