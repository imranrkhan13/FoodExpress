export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface IRestaurant {
  name: string;
  cuisines: string[];
  rating: number;
  cost_for_two: number;
  is_open: boolean;
  address: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  menu: MenuCategory[];
}

export interface RestaurantQueryParams {
  search?: string;
  cuisines?: string[];
  minRating?: number;
  maxCost?: number;
  isOpen?: boolean;
  sortBy?: 'best_match' | 'rating_high' | 'cost_low';
  page?: number;
  limit?: number;
}

