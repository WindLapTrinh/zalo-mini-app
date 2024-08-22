import React from "react";
import { Box, Input, Button } from "zmp-ui";
import "../../css/login/homeLogin.css"; 

const HomeLogin = () => {
  return (
    <Box className="login-page" p={4}>
      <Box className="login-container" p={4}>
        <Input
          type="text"
          placeholder="Username"
          className="input-field"
          clearable
        />
        <Input
          type="password"
          placeholder="Password"
          className="input-field"
          clearable
        />
        <Button type="primary" className="login-button">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default HomeLogin;
