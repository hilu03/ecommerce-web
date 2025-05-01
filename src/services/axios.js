import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosAuth = axios.create({ baseURL });
axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const axiosPublic = axios.create({ baseURL });

export { axiosAuth, axiosPublic };
