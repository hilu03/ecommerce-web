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
    throw new Error(error.response?.data?.message);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosPublic.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const getReviewStatisticByProductId = async (id) => {
  try {
    const response = await axiosPublic.get(`/reviews/product/${id}/statistic`);
    return response.data.data;
  } catch (error) {
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
    return response.data.data;
  } 
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
};

export const getProductDetailForAdmin = async (id) => {
  try {
    const response = await axiosAuth.get(`/products/${id}/admin`);
    return response.data.data;
  } 
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
}

export const getAllFeaturedProducts = async (page = 0, size = 10, sortDir = "desc", sortBy = "updatedAt") => {
  try {
    const response = await axiosAuth.get("/products/feature", {
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

export const updateFeaturedProduct = async (id, data) => {
  try {
    await axiosAuth.put(`/products/feature/${id}`, data);
  }
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
}

export const deleteFeatureProduct = async (id) => {
  try {
    await axiosAuth.delete(`/products/feature/${id}`);
  }
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
}

export const searchByName = async (name, page = 0, size = 5, sortDir = "desc", sortBy = "updatedAt") => {
  try {
    const response = await axiosAuth.get("/products/search", {
      params: {
        name,
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

export const addFeaturedProduct = async (data) => {
  try {
    await axiosAuth.post("/products/feature", data);
  } 
  catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message);
  }
}