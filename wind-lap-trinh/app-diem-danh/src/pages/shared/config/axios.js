import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://demo-x.ileader.vn/",
});

export default axiosClient;
