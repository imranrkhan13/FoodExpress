import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem {
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export interface IMenuCategory {
  category: string;
  items: IMenuItem[];
}

export interface IRestaurant extends Document {
  name: string;
  cuisines: string[];
  rating: number;
  cost_for_two: number;
  is_open: boolean;
  address: string;
  images: string[];
  menu: IMenuCategory[];
}

const MenuItemSchema = new Schema<IMenuItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
});

const MenuCategorySchema = new Schema<IMenuCategory>({
  category: { type: String, required: true },
  items: [MenuItemSchema],
});

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    cuisines: { type: [String], required: true },
    rating: { type: Number, required: true },
    cost_for_two: { type: Number, required: true },
    is_open: { type: Boolean, required: true },
    address: { type: String, required: true },
    images: { type: [String], required: true },

    // THE IMPORTANT PART!!!
    menu: { type: [MenuCategorySchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
