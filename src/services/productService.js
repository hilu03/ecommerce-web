import {axiosPublic, axiosAuth } from './axios.js';

export const getActiveFeaturedProduct = async (page = 0, size = 10) => {
  try {
    const response = await axiosPublic.get('/products/feature/active', {
      params: {
        page,
        size
      }
    });

    return response.data.data;
  } catch (error) {
    // Ném ra lỗi để component phía trên xử lý hiển thị
    throw new Error(error.response?.data?.message);
  }
};

export const getProductDetailById = async (id) => {
  try {
    const response = await axiosPublic.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    // Ném ra lỗi để component phía trên xử lý hiển thị
    throw new Error(error.response?.data?.message);
  }
};

export const getReviewStatisticByProductId = async (id) => {
  try {
    const response = await axiosPublic.get(`/reviews/product/${id}/statistic`);
    return response.data.data;
  } catch (error) {
    // Ném ra lỗi để component phía trên xử lý hiển thị
    throw new Error(error.response?.data?.message);
  }
};