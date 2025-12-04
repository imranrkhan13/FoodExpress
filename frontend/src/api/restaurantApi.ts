import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getRestaurants = async (page: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants?page=${page}`);
    return response.data;  // Should be the JSON from backend
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
