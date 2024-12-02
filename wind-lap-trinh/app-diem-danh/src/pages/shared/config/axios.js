import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://demo-x.ileader.vn/",
});

export default axiosClient;
