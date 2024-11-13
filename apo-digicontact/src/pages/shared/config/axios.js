import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://apo2.ileader.vn/",
});

export default axiosClient;
