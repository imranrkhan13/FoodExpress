import dotenv from "dotenv";
dotenv.config();

console.log("MONGODB_URI =", process.env.MONGODB_URI);  // 👀 Check this

import mongoose from "mongoose";
import Restaurant from "./models/Restaurant";
import { restaurantData } from "./utils/seedData";

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");

    await Restaurant.deleteMany();
    console.log("Old data removed");

    await Restaurant.insertMany(restaurantData);
    console.log("New restaurant data inserted!");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
