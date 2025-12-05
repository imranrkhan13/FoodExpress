import express from 'express';
import {
  getRestaurants,
  getRestaurantById,
  getCuisines,
} from '../controllers/restaurantController';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/cuisines', getCuisines);
router.get('/:id', getRestaurantById);

export default router;
