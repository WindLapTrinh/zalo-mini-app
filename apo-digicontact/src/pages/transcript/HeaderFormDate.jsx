import React from 'react';
import { Box, Select, Text } from 'zmp-ui';

const HeaderFormDate = ({image, title}) => {
  return (
    <Box>
      <div className="header-form-date">
        <img
          className="img-header-form"
          src={image}
        />
        <Text className="title-header-form">{title}</Text>
      </div>
    </Box>
  );
};
export default HeaderFormDate;
