import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://demo-x.ileader.vn/",
  timeout: 10000, // Thời gian chờ request (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
