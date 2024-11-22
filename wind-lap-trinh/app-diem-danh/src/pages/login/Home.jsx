import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Text } from "zmp-ui";
import useToast from "../shared/hooks/useToast";
import CustomHeader from "../shared/pages/CustomHeader";
import axiosClient from "../shared/config/axios";
import useAuth from "../shared/hooks/useAuth";
import "../../css/login/home.css";

const Home = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "", api: "" });
  const showToast = useToast();

  const handleError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleOnClickLogin = async () => {
    setErrors({ username: "", password: "", api: "" });
    let isValid = true;

    if (!userName) {
      handleError("username", "Tên đăng nhập không được để trống.");
      isValid = false;
    }

    if (!password) {
      handleError("password", "Mật khẩu không được để trống.");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    try {
      const response = await axiosClient.post(
        `api/MiniApp/CheckUser?userName=${userName}&pass=${password}`,
        { withCredentials: true }
      );

      const data = response.data;
      console.log("Data:", data);
      // if (data.success === true) {
      //   const token = data.message; // Giả sử token là message trong response
      //   saveToken(token);
      //   localStorage.setItem("guidTeacher", token);

      //   navigate("/class", { state: { guidTeacher: token } });
      // } else {
      //   handleError("api", "Tên đăng nhập hoặc mật khẩu không đúng!");
      // }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Không thể kết nối đến server. Vui lòng thử lại.";
      handleError("api", errorMessage);
      showToast("Có lỗi xảy ra. Vui lòng thử lại!", 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <CustomHeader imageUrl={"./images/logo/ileader-white.png"} />
      <Box className="login-page" p={4}>
        <Box className="login-container" p={4}>
          <Input
            type="text"
            placeholder="Username"
            className="input-field"
            clearable
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.username && (
            <Text size="small" color="danger" className="error-text">
              {errors.username}
            </Text>
          )}

          <Input
            type="password"
            placeholder="Password"
            className="input-field"
            clearable
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <Text size="small" color="danger" className="error-text" mb={2}>
              {errors.password}
            </Text>
          )}

          {errors.api && (
            <Text size="small" color="danger" className="error-text" mb={2}>
              {errors.api}
            </Text>
          )}

          <Button
            type="primary"
            className="login-button"
            onClick={handleOnClickLogin}
            loading={loading}
            mt={2}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
