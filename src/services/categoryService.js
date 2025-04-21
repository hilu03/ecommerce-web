import {axiosPublic} from "./axios.js";

export const getCategoriesList = async () => {
  try {
    const response = await axiosPublic.get("/categories")
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error)
    throw error;
  }
};