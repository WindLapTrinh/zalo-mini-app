import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Text } from "zmp-ui";
import useToast from "../shared/hooks/useToast";
import CustomHeader from "../shared/pages/CustomHeader";
import axios from "axios";
import "../../css/login/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(""); 
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const showToast = useToast();

  const handleOnClickLogin = async () => {
    setUsernameError("");
    setPasswordError("");
    setApiError("");
    let isValid = true;
  
    if (!userName) {
      setUsernameError("Tên đăng nhập không được để trống.");
      isValid = false;
    }
  
    if (!password) {
      setPasswordError("Mật khẩu không được để trống.");
      isValid = false;
    }
  
    if (!isValid) return;
  
    setLoading(true);
  
    try {
      const response = await axios.post(
        `https://demo-x.ileader.vn/api/MiniApp/CheckUser?userName=${userName}&pass=${password}`
      );
  
      const data = response.data; // Lấy data từ response
      console.log(data);
  
      if (data.success == true) {
        localStorage.setItem("userGuid", data.message);
  
        navigate("/homePage", { state: { guid: data.message } });
      } else {
        showToast("Tên đăng nhập hoặc mật khẩu không đúng!", 2000);
      }
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data?.message || "Có lỗi xảy ra.");
      } else if (error.request) {
        setApiError("Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối.");
      } else {
        setApiError("Đã xảy ra lỗi không xác định.");
      }
      showToast("Có lỗi xảy ra. Vui lòng thử lại!", 2000);

    } finally {
      setLoading(false); // Đảm bảo trạng thái loading luôn được tắt
    }
  };
  

  return (
    <Box>
      <CustomHeader title={"App Điểm Danh"} />
      <Box className="login-page" p={4}>
        <Box className="login-container" p={4}>
          {/* Username Input */}
          <Input
            type="text"
            placeholder="Username"
            className="input-field"
            clearable
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {usernameError && (
            <Text size="small" color="danger" className="error-text">
              {usernameError}
            </Text>
          )}

          {/* Password Input */}
          <Input
            type="password"
            placeholder="Password"
            className="input-field"
            clearable
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <Text size="small" color="danger" className="error-text">
              {passwordError}
            </Text>
          )}

          <Button
            type="primary"
            className="login-button"
            onClick={handleOnClickLogin}
            loading={loading}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
