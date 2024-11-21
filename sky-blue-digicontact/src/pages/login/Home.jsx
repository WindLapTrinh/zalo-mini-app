import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Box, Button, Text, Icon } from "zmp-ui";
import SliderLogin from "./Slider";
import Infomation from "./Infomation";
import Security from "./Security";
import Feature from "./Feature";
import usePhoneNumber from "../shared/hooks/usePhoneNumber";
import Introduce from "./Introduce";
import CustomHeader from "../shared/pages/CustomHeader";
import "../../css/login/login.css";

const Login = () => {
  const navigate = useNavigate();
  const {
    phoneNumber,
    loading: phoneLoading,
    error: phoneError,
    fetchPhoneNumber,
  } = usePhoneNumber();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const { phoneNumber } = JSON.parse(storedData);
      if (phoneNumber) {
        navigate("/students", { state: { phoneNumber } });
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn && phoneNumber) {
      localStorage.setItem("userData", JSON.stringify({ phoneNumber }));
      navigate("/students", { state: { phoneNumber } });
      console.log("Phone number:", phoneNumber);
    }
  }, [isLoggedIn, phoneNumber, navigate]);

  const handleLogin = async () => {
    await fetchPhoneNumber(); 
    if (!phoneError) {
      setIsLoggedIn(true);
    } else {
      console.error("Error fetching phone number:", phoneError);
    }
  };

  return (
    <div>
      {!isLoggedIn && (
        <Page className="page-login">
          <CustomHeader title={"BLUE SKY VFF"} showBackIcon={false}/>
          <Box className="header-login">
            <Introduce />
            <SliderLogin />
            <Feature />
          </Box>
          <Box className="body-login">
            <Security />
            <Infomation />
            <Box mt={2}>
              <Button className="btn-login" fullWidth onClick={handleLogin}>
                Đã hiểu
              </Button>
            </Box>
          </Box>
        </Page>
      )}
    </div>
  );
};

export default Login;
