import { axiosAuth, axiosPublic } from "./axios";

export const getReviewByProductId = async (id, page = 0, size = 5, sortBy = 'updatedAt', sortDir = 'desc') => {
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
    console.log(error);
    throw new Error(error.response?.data?.message);
  }
};

export const createReview = async (request) => {
  try {
    await axiosAuth.post("/reviews", request);
  }
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
}

export const deleteReview = async (id) => {
  try {
    await axiosAuth.delete(`/reviews/${id}`);
  }
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
}