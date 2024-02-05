import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://invoicexpress.onrender.com/api/auth/",
});
export default axiosInstance;
