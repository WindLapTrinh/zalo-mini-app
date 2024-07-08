import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://ileader.cloud/api/MiniApp/Pay', // Thay đổi baseURL theo API của bạn
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);

export default axiosClient;
