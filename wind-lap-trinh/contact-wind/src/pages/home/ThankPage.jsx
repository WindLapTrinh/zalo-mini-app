import React from 'react';
import { Box, Page, Text, Icon } from 'zmp-ui';
import '../../css/detailhome/thankpage.css';

const ThankPage = () => {
  return (
    <Page className="thank-page">
      <Box className="thank-content">
        <img src="./images/logo/wind-app.png" alt="Logo" className="thank-logo" />
        <Text className="thank-title" type="title">Thanks for being with us.</Text>
      </Box>
    </Page>
  );
};

export default ThankPage;
