import { axiosAuth } from "./axios";

export const getMyInfo = async () => {
  try {
    const response = await axiosAuth.get("/users/me");
    return response.data.data;
  }
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
};

export const updateInfo = async (data) => {
  try {
    await axiosAuth.put("/users/me", data);
  }
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
};