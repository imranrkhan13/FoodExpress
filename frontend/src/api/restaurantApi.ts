import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getRestaurants = async (page: number, limit: number, filters: any) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/restaurants`, { params: { page, limit, ...filters } });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
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
