import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getRestaurants = async (page: number, keyword = "", minRating = 0, maxCost = 1000) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/restaurants?page=${page}&keyword=${keyword}&minRating=${minRating}&maxCost=${maxCost}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};


export const getRestaurantById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    throw error;
  }
};
