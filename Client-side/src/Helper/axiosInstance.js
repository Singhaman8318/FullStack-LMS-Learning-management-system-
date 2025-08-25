import axios from 'axios';

// const BASE_url="https://lms-pcsk.onrender.com/";
const BASE_url="http://localhost:5014/";

const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=BASE_url;

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;