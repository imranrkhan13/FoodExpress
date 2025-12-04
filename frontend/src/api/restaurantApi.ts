import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Get all restaurants
export const getRestaurants = async (page: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

// ✅ Add this function for a single restaurant
export const getRestaurantById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    throw error;
  }
};
