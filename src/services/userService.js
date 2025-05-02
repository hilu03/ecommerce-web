import { axiosAuth } from "./axios";

export const getActiveUsers = async (page = 0, size = 10, sortDir = "asc", sortBy = "createdAt") => {
  try {
    const response = await axiosAuth.get("/admin/users", {
      params: {
        page,
        size,
        sortBy,
        sortDir
      }
    });
    return response.data.data;
  }
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
}

export const getInactiveUsers = async (page = 0, size = 10, sortDir = "asc", sortBy = "createdAt") => {
  try {
    const response = await axiosAuth.get("/admin/users/inactive", {
      params: {
        page,
        size,
        sortBy,
        sortDir
      }
    });
    return response.data.data;
  }
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
}

export const toggleUserStatus = async (email) => {
  try {
    await axiosAuth.patch("/admin/toggle-status", null, {
      params: {
        email
      }
    })
  }
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
};