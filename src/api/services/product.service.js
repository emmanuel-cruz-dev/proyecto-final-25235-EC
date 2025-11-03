import axios from "../axiosConfig";

const getProducts = async () => {
  try {
    const response = await axios.get("/products");

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(`/products/${id}`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
};

export const productService = {
  getProducts,
  getProductById,
};
