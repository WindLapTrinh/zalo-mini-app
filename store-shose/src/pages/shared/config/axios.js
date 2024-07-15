import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://duong-dan/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export { axiosClient };
