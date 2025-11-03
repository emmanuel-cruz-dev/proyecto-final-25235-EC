import axios from "../axiosConfig";

const getUsers = async () => {
  try {
    const response = await axios.get("/users");

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`/users/${id}`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};

const getUserByRole = async (role) => {
  try {
    const response = await axios.get(`/users?role=${role}`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user by role", error);
    throw error;
  }
};

export const userService = {
  getUsers,
  getUserById,
  getUserByRole,
};
