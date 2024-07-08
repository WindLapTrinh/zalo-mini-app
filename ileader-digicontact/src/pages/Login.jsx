import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  Icon,
  Page,
  Box,
  Button,
  Text,
  Header,
  useTheme,
  Sheet,
  List,
  Avatar,
} from "zmp-ui";
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis";
import axios from "axios";
import "../css/login.css";
import "../css/detailHome.css";
const Login = () => {
  const navigate = useNavigate();
  const endpoint = "https://graph.zalo.me/v2.0/me/info";
  const secretKey = "SC7C3EQocWcEMVUXrP2d";
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State để xác định trạng thái đăng nhập

  useEffect(() => {
    // Kiểm tra xem đã có thông tin đăng nhập được lưu trữ không
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      const userData = JSON.parse(storedData);
      // Chuyển hướng đến trang Home với dữ liệu đăng nhập đã lưu trữ
      navigate("/home", { state: { phoneNumber: userData.phoneNumber } });
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const accessToken = await getAccessToken();
      const { token: phoneNumberToken } = await getPhoneNumber();

      // Kiểm tra xem đã có cả accessToken và phoneNumberToken
      if (accessToken && phoneNumberToken) {
        const response = await axios.get(endpoint, {
          headers: {
            access_token: accessToken,
            code: phoneNumberToken,
            secret_key: secretKey,
          },
        });
        console.log("Response Code:", response.status);
        console.log("Response Body:", response.data);

        // Nếu nhận được số điện thoại từ Zalo, đánh dấu là đã đăng nhập và chuyển hướng đến trang home
        if (response.data.data.number) {
          setIsLoggedIn(true);
          // Lưu thông tin đăng nhập vào localStorage để sử dụng lần sau
          localStorage.setItem(
            "userData",
            JSON.stringify({ phoneNumber: response.data.data.number })
          );
          navigate("home", {
            state: { phoneNumber: response.data.data.number },
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {!isLoggedIn && (
        <Page className="login-container">
          <Box mt={6} className="error-login">
            <Text className="italic-sub-title title-login" size="xSmall">
              <Icon className="zi-warning" icon="zi-warning" /> Do chính sách
              bảo mật dữ liệu
            </Text>
          </Box>
          <Box mt={6}>
            <Text className="italic-sub-title title-login" size="xSmall">
              <b>iLeader Digicontact cần thông tin của bạn</b>
            </Text>
          </Box>
          <Box>
            <img
              className="slide-img img-lg"
              src="/images/ileader_1.jpg"
              alt="slide-1"
            />
          </Box>
          <Box mt={6} className="call-admin">
            <a className="link-admin">
              <p className="text-success">
                Cung cấp <b>số điện thoại</b> dùng để đăng ký học viên và liên lạc
              </p>
              <Icon className="icphone-login" icon="zi-call-solid" />
            </a>
          </Box>
          <Box mt={6}>
            <Button className="btn-login" fullWidth onClick={handleLogin}>
              Đã hiểu
            </Button>
          </Box>
        </Page>
      )}
    </div>
  );
};

export default Login;
