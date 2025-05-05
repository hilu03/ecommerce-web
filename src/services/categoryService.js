import { data } from "react-router-dom";
import { axiosPublic, axiosAuth } from "./axios.js";

export const getActiveCategories = async () => {
  try {
    const response = await axiosPublic.get("/categories")
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error)
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axiosPublic.get(`/categories/${id}`)
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error)
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axiosAuth.post("/categories", category);
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi thêm danh mục:", error)
    throw error;
  }
}

export const updateCategory = async (id, category) => {
  try {
    console.log(category);
    await axiosAuth.put(`/categories/${id}`, category)
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa danh mục:", error)
    throw error;
  }
}

export const getDeletedCategories = async () => {
  try {
    const response = await axiosAuth.get("/categories/deleted")
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error)
    throw error;
  }
};

export const toggleCategory = async (id) => {
  try {
    await axiosAuth.patch(`/categories/${id}/toggle`);
  }
  catch (error) {
    console.error("Không thể cập nhật danh mục:", error)
    throw error;
  }
}