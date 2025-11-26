export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}



export interface Restaurant {
  _id: string;
  name: string;
  cuisines: string[];
  rating: number;
  cost_for_two: number;
  is_open: boolean;
  address: string;
  images: string[];
  menu: MenuCategory[];
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantFilters {
  search: string;
  cuisines: string[];
  minRating: number;
  maxCost: number;
  isOpen: boolean | null;
  sortBy: 'best_match' | 'rating_high' | 'cost_low';
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface RestaurantResponse {
  success: boolean;
  data: Restaurant[];
  pagination: PaginationData;
}