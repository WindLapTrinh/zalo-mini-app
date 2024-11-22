import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith("authToken="));

      if (cookie) {
        const tokenValue = cookie.split("=")[1];
        setToken(tokenValue);
      }
    } catch (error) {
      console.error("Error reading auth token from cookies:", error);
    }
  }, []);

  const saveToken = (token) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Token hết hạn sau 7 ngày
    document.cookie = `authToken=${token}; path=/; expires=${expiryDate.toUTCString()}; Secure; SameSite=Strict`;
    setToken(token);
  };

  const removeToken = () => {
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
    setToken(null);
  };

  return { token, saveToken, removeToken };
};

export default useAuth;
