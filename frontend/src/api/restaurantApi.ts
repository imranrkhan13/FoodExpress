import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
export const getRestaurants = async (
  page: number,
  limit: number,
  filters: any
) => {
  const params: any = {
    page,
    limit,
    ...filters,
  };

  const res = await axios.get(`${API_BASE_URL}/restaurants`, { params });
  return res.data;
};
;



export const getRestaurantById = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/restaurants/${id}`);
  return res.data.data; // single restaurant
};
