import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://testing-pyo7.onrender.com/api/auth/",
});
export default axiosInstance;
