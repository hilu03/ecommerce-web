import {axiosPublic, axiosAuth } from './axios.js';

export const getActiveFeaturedProduct = async (page = 0, size = 10, sortDir = "asc", sortBy = "createdAt") => {
  try {
    const response = await axiosPublic.get('/products/feature/active', {
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
    throw new Error(error.response?.data?.message);
  }
};

export const getProductById = async (id) => {
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

export const getActiveProductByCategoryId = async (id, page = 0, size = 10, sortDir = "asc", sortBy = "createdAt") => {
  try {
    const response = await axiosPublic.get(`/products/category/${id}`, {
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
    throw new Error(error.response?.data?.message);
  }
};

export const getHiddenProductByCategoryId = async (id, page = 0, size = 10, sortDir = "asc", sortBy = "createdAt") => {
  try {
    const response = await axiosAuth.get(`/products/category/${id}/hidden`, {
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
    throw new Error(error.response?.data?.message);
  }
};

export const getAllActiveProducts = async (page = 0, size = 10, sortDir = "asc", sortBy = "createdAt") => {
  try {
    const response = await axiosPublic.get(`/products`, {
      params: {
        page,
        size,
        sortBy,
        sortDir
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const toggleProductStatus = async (id) => {
  try {
    const response = await axiosAuth.patch(`/products/${id}/toggle`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi toggle sản phẩm");
  }
};

export const createProduct = async (productData, imageFile) => {
  try {
    const formData = new FormData();
    
    formData.append('productInfo', new Blob([JSON.stringify(productData)], { type: 'application/json' }));

    formData.append('imageFile', imageFile);

    const response = await axiosAuth.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    throw error;
  }
};

export const updateProduct = async (id, productInfo, imageFile) => {
  const formData = new FormData();

  const productInfoBlob = new Blob([JSON.stringify(productInfo)], {
    type: "application/json",
  });
  formData.append("productInfo", productInfoBlob);

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  const response = await axiosAuth.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAllHiddenProducts = async (page = 0, size = 10, sortDir = "asc", sortBy = "createdAt") => {
  try {
    const response = await axiosAuth.get(`/products/hidden`, {
      params: {
        page,
        size,
        sortBy,
        sortDir
      }
    });
    console.log(response.data.data);
    return response.data.data;
  } 
  catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const getProductDetailForAdmin = async (id) => {
  try {
    const response = await axiosAuth.get(`/products/${id}/admin`);
    return response.data.data;
  } 
  catch (error) {
    throw new Error(error.response?.data?.message);
  }
}