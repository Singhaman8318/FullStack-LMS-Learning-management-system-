import axios from 'axios';

const BASE_url="http://localhost:5014/";
// const BASE_url = "https://fullstack-lms-learning-management-system-2syi.onrender.com/";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_url;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
