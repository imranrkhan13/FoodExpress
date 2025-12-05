import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getRestaurants = async (page: number, limit: number, filters: any) => {
  const params: any = {
    page,
    limit,
    ...filters,
    minRating: Number(filters.minRating), // ensure number
    maxCost: Number(filters.maxCost),     // ensure number
    isOpen: filters.isOpen ? "true" : undefined, // string for backend
  };

  const res = await axios.get(`${API_BASE_URL}/restaurants`, { params });
  return res.data;
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
