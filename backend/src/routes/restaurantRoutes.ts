import express from 'express';
import {
  getRestaurants,
  getRestaurantById,
  seedRestaurants,
  getCuisines,
} from '../controllers/restaurantController';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/cuisines', getCuisines);
router.get('/:id', getRestaurantById);
router.post('/seed', seedRestaurants);

export default router;
