import {axiosPublic, axiosAuth } from './axios.js';

export const loginAPI = async (email, password) => {
  try {
    const response = await axiosPublic.post('/auth/login', {
      email,
      password
    });

    return response.data.data;
  } catch (error) {
    // Ném ra lỗi để component phía trên xử lý hiển thị
    // throw new Error(error.response?.data?.message || "Đăng nhập thất bại!");
    throw new Error("Đăng nhập thất bại!");
  }
};

export const registerAPI = async (info) => {
  try {
    const response = await axiosPublic.post('/auth/register', info);
    return response.data.data;
  } catch (error) {
    // Ném ra lỗi để component phía trên xử lý hiển thị
    // throw new Error(error.response?.data?.message || "Email đã tồn tại!");
    throw new Error("Email đã tồn tại!");
  }
};

export const logoutAPI = async () => {
  try {
    const response = await axiosAuth.post('/auth/logout');
    return response.data.data;
  } catch (error) {
    // Ném ra lỗi để component phía trên xử lý hiển thị
    // throw new Error(error.response?.data?.message);
    console.error(error);
  }
};


