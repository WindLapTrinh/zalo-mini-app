import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button } from "zmp-ui";
import "../../css/login/home.css"; 

const Home = () => {
  const navigate = useNavigate();
  const handleOnClickLogin = () =>{
    navigate("/homePage")
  }
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
        <Button type="primary" className="login-button" onClick={handleOnClickLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
