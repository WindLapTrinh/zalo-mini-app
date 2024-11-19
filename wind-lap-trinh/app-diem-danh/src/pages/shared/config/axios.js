import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://hoanganh2.ileader.vn/",
});

export default axiosClient;
