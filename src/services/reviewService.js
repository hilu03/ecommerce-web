import { axiosPublic } from "./axios";

export const getReviewByProductId = async (id, page = 0, size = 5, sortBy = 'createdAt', sortDir = 'asc') => {
  try {
    const response = await axiosPublic.get(`/reviews/product/${id}`, {
      params: {
        page,
        size,
        sortBy,
        sortDir
      }
    });
    return response.data.data;
  } catch (error) {
    // Ném ra lỗi để component phía trên xử lý hiển thị
    console.log(error);
    throw new Error(error.response?.data?.message);
  }
};