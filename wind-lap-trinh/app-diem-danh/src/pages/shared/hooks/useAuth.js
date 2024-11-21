import { useState, useEffect } from "react";

// Hook để quản lý cookie (token) trong ứng dụng
const useAuth = () => {
  const [token, setToken] = useState(null);

  // Kiểm tra cookie khi component mount
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("authToken="));

    if (cookie) {
      const tokenValue = cookie.split("=")[1];
      setToken(tokenValue);
    }
  }, []);

  // Lưu token vào cookie
  const saveToken = (token) => {
    document.cookie = `authToken=${token}; path=/;`;
    setToken(token);
  };

  // Xóa token
  const removeToken = () => {
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setToken(null);
  };

  return { token, saveToken, removeToken };
};

export default useAuth;
