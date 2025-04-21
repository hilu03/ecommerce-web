import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// 1️⃣ Instance có token (dành cho API cần xác thực)
const axiosAuth = axios.create({ baseURL });
axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // hoặc lấy từ Redux/store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2️⃣ Instance không token (dành cho login, register,...)
const axiosPublic = axios.create({ baseURL });

export { axiosAuth, axiosPublic };
