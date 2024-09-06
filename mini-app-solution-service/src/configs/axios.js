import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://ileader.cloud/api/",
});
