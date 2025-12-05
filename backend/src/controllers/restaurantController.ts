import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';
import { RestaurantQueryParams } from '../types/restaurant';



export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      cuisines,
      minRating,
      maxCost,
      isOpen,
      sortBy = 'best_match',
      page = 1,
      limit = 12,
    } = req.query as any;

    // Build query object
    const query: any = {};

    // Search by name (case-insensitive regex)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisines: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by cuisines (multi-select)
    if (cuisines) {
      const cuisineArray = Array.isArray(cuisines) ? cuisines : [cuisines];
      query.cuisines = { $in: cuisineArray.map(c => new RegExp(c, 'i')) };
    }

    // Filter by minimum rating
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Filter by maximum cost for two
    if (maxCost) {
      query.cost_for_two = { $lte: parseInt(maxCost) };
    }

    // Filter by open/closed status
    if (isOpen !== undefined) {
      query.is_open = isOpen === 'true';
    }

    // Sorting logic
    let sort: any = {};
    switch (sortBy) {
      case 'rating_high':
        sort = { rating: -1 };
        break;
      case 'cost_low':
        sort = { cost_for_two: 1 };
        break;
      case 'best_match':
      default:
        sort = { rating: -1, cost_for_two: 1 };
    }

    // Pagination (disable when searching)
    let pageNum = parseInt(page as string);
    let limitNum = parseInt(limit as string);

    if (search) {
      pageNum = 1;       // always reeturn page 1 when searching
      limitNum = 500;    // large limit so all matches show
    }

    const skip = (pageNum - 1) * limitNum;


    // Execute query
    const restaurants = await Restaurant.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Get totals count for pagination
    const total = await Restaurant.countDocuments(query);

    res.status(200).json({
      success: true,
      data: restaurants,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurants',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};


//  * Get single restaurant by ID

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);


    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurant',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Seed database with sample data
 */
// export const seedRestaurants = async (req: Request, res: Response): Promise<void> => {
//   try {
//     await seedDatabase();

//     res.status(200).json({
//       success: true,
//       message: 'Database seeded successfully',
//     });
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error seeding database',
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//   }
// };

/**
 * Get all unique cuisines for filter options
 */
export const getCuisines = async (req: Request, res: Response): Promise<void> => {
  try {
    const cuisines = await Restaurant.distinct('cuisines');

    res.status(200).json({
      success: true,
      data: cuisines.sort(),
    });
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cuisines',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

};

