import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://bluesky.ileader.vn/",
});

export default axiosClient;
