import Restaurant from '../models/Restaurant';
import { IRestaurant } from '../types/restaurant';

export const restaurantData: IRestaurant[] = [
  {
    name: "Spice Symphony",
    cuisines: ["Indian", "North Indian", "Mughlai"],
    rating: 4.5,
    cost_for_two: 800,
    is_open: true,
    address: "123 MG Road, Bangalore, Karnataka 560001",
    images: ["https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800"],
    menu: [
      {
        category: "Starters",
        items: [
          {
            name: "Chicken Tikka",
            price: 250,
            description: "Tender chicken pieces grilled to perfection",
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600"
          },
          {
            name: "Paneer Tikka",
            price: 220,
            description: "Cottage cheese marinated and grilled in a tandoor",
            image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600"
          }
        ]
      },
      {
        category: "Main Course",
        items: [
          {
            name: "Butter Chicken (Mughlai)",
            price: 450,
            description: "Creamy tomato gravy with soft chicken, a classic.",
            image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600"
          },
          {
            name: "Mutton Rogan Josh",
            price: 520,
            description: "Aromatic lamb curry from Kashmir",
            image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600"
          },
          {
            name: "Dal Makhani",
            price: 320,
            description: "Black lentils and kidney beans slow-cooked with cream and butter",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600"
          }
        ]
      }
    ]
  },
  {
    name: "Dragon Wok",
    cuisines: ["Chinese", "Asian", "Thai"],
    rating: 4.2,
    cost_for_two: 600,
    is_open: true,
    address: "45 Brigade Road, Bangalore, Karnataka 560025",
    images: ["https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800"],
    menu: [
      {
        category: "Appetizers",
        items: [
          {
            name: "Crispy Vegetable Spring Rolls",
            price: 180,
            description: "Deep-fried rolls with julienned vegetables and sweet chili dip",
            image: "https://images.unsplash.com/photo-1619893549946-b7c936b7f38a?w=600"
          },
          {
            name: "Chili Chicken Dry",
            price: 280,
            description: "Wok-tossed chicken with bell peppers, onions, and spicy chili sauce",
            image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600"
          }
        ]
      },
      {
        category: "Main Course",
        items: [
          {
            name: "Chicken Schezwan Noodles",
            price: 260,
            description: "Spicy stir-fried noodles with shredded chicken and Schezwan sauce",
            image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600"
          },
          {
            name: "Prawns in Hot Garlic Sauce",
            price: 380,
            description: "Fresh prawns cooked in a zesty hot garlic gravy",
            image: "https://images.unsplash.com/photo-1559847844-d023c4379cc6?w=600"
          }
        ]
      }
    ]
  },
  {
    name: "Pizza Paradise",
    cuisines: ["Italian", "Pizza", "Fast Food"],
    rating: 4.3,
    cost_for_two: 500,
    is_open: true,
    address: "78 Indiranagar, Bangalore, Karnataka 560038",
    images: ["https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"],
    menu: [
      {
        category: "Classic Pizzas",
        items: [
          {
            name: "Margherita (10\")",
            price: 320,
            description: "Classic tomato sauce, mozzarella, and fresh basil",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600"
          },
          {
            name: "Pepperoni Dream (10\")",
            price: 450,
            description: "Loaded with spicy pepperoni slices",
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600"
          }
        ]
      },
      {
        category: "Sides & Drinks",
        items: [
          {
            name: "Garlic Bread Sticks",
            price: 150,
            description: "Cheesy garlic bread served with marinara dip",
            image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600"
          },
          {
            name: "Cold Coffee",
            price: 120,
            description: "Blended coffee with milk and ice cream",
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600"
          }
        ]
      }
    ]
  },
  {
    name: "Sushi Zen",
    cuisines: ["Japanese", "Sushi", "Asian"],
    rating: 4.7,
    cost_for_two: 1200,
    is_open: false,
    address: "92 Koramangala, Bangalore, Karnataka 560095",
    images: ["https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800"],
    menu: [
      {
        category: "Nigiri & Sashimi",
        items: [
          {
            name: "Tuna Nigiri (2 pcs)",
            price: 450,
            description: "Fresh tuna slice over seasoned rice",
            image: "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=600"
          },
          {
            name: "Salmon Sashimi (3 pcs)",
            price: 550,
            description: "Thinly sliced raw salmon, served with wasabi and ginger",
            image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600"
          }
        ]
      },
      {
        category: "Maki Rolls",
        items: [
          {
            name: "California Roll (8 pcs)",
            price: 650,
            description: "Crab stick, avocado, cucumber, and sesame seeds",
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600"
          },
          {
            name: "Spicy Tuna Roll (8 pcs)",
            price: 750,
            description: "Tuna mixed with spicy mayonnaise and chili",
            image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=600"
          }
        ]
      }
    ]
  },
  {
    name: "Burger Bliss",
    cuisines: ["American", "Burgers", "Fast Food"],
    rating: 4.0,
    cost_for_two: 400,
    is_open: true,
    address: "34 Whitefield, Bangalore, Karnataka 560066",
    images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"],
    menu: [
      {
        category: "Gourmet Burgers",
        items: [
          {
            name: "Classic Cheese Burger",
            price: 250,
            description: "Beef patty, cheddar cheese, lettuce, tomato, and pickle",
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600"
          },
          {
            name: "Spicy Paneer Burger",
            price: 220,
            description: "Crispy paneer patty with spicy mayo and onions",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600"
          }
        ]
      },
      {
        category: "Sides & Shakes",
        items: [
          {
            name: "Peri-Peri Fries",
            price: 150,
            description: "French fries tossed in peri-peri seasoning",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600"
          },
          {
            name: "Chocolate Thick Shake",
            price: 180,
            description: "Rich and creamy chocolate shake",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600"
          }
        ]
      }
    ]
  },
  {
    name: "Tandoor Tales",
    cuisines: ["Indian", "Tandoor", "Biryani"],
    rating: 4.6,
    cost_for_two: 700,
    is_open: true,
    address: "56 HSR Layout, Bangalore, Karnataka 560102",
    images: ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800"],
    menu: [
      {
        category: "Tandoori Delights",
        items: [
          {
            name: "Malai Chicken Tikka",
            price: 320,
            description: "Creamy, mild chicken pieces cooked in a clay oven",
            image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600"
          },
          {
            name: "Seekh Kebab",
            price: 300,
            description: "Minced lamb mixed with spices and grilled on skewers",
            image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600"
          }
        ]
      },
      {
        category: "Biryanis",
        items: [
          {
            name: "Hyderabadi Chicken Biryani",
            price: 380,
            description: "Layered rice dish with marinated chicken, served with raita",
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600"
          },
          {
            name: "Vegetable Dum Biryani",
            price: 320,
            description: "Aromatic rice and mixed vegetables cooked 'dum' style",
            image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=600"
          }
        ]
      }
    ]
  },
  {
    name: "Pasta House",
    cuisines: ["Italian", "Pasta", "Continental"],
    rating: 4.4,
    cost_for_two: 650,
    is_open: true,
    address: "23 Jayanagar, Bangalore, Karnataka 560041",
    images: ["https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800"],
    menu: [
      {
        category: "Starters",
        items: [
          {
            name: "Chicken Tikka",
            price: 250,
            description: "Tender chicken pieces grilled to perfection",
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600"
          },
          {
            name: "Veg Spring Roll",
            price: 180,
            description: "Crispy rolls stuffed with veggies",
            image: "https://images.unsplash.com/photo-1619893549946-b7c936b7f38a?w=600"
          }
        ]
      },
      {
        category: "Main Course",
        items: [
          {
            name: "Butter Chicken",
            price: 350,
            description: "Creamy tomato gravy with soft chicken",
            image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600"
          },
          {
            name: "Creamy Alfredo Pasta",
            price: 420,
            description: "Fettuccine pasta tossed in a rich, creamy white sauce",
            image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600"
          }
        ]
      },
      {
        category: "Desserts",
        items: [
          {
            name: "Tiramisu",
            price: 200,
            description: "Classic Italian coffee-flavored dessert",
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600"
          }
        ]
      }
    ]
  },
  {
    name: "Taco Fiesta",
    cuisines: ["Mexican", "Tacos", "Tex-Mex"],
    rating: 4.1,
    cost_for_two: 550,
    is_open: true,
    address: "89 JP Nagar, Bangalore, Karnataka 560078",
    images: ["https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800"],
    menu: [
      {
        category: "Tacos & Burritos",
        items: [
          {
            name: "Chicken Tinga Tacos (3 pcs)",
            price: 280,
            description: "Shredded chicken in a tomato-chipotle sauce, served in soft tortillas",
            image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600"
          },
          {
            name: "Veggie Burrito Bowl",
            price: 320,
            description: "Rice, beans, salsa, sour cream, and fresh vegetables",
            image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600"
          }
        ]
      },
      {
        category: "Sides",
        items: [
          {
            name: "Guacamole & Chips",
            price: 200,
            description: "Freshly made avocado dip with crispy corn tortilla chips",
            image: "https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?w=600"
          },
          {
            name: "Jalapeño Poppers",
            price: 180,
            description: "Breaded and deep-fried jalapeño halves filled with cream cheese",
            image: "https://images.unsplash.com/photo-1626776876729-bab4652adb4e?w=600"
          }
        ]
      }
    ]
  },
  {
    name: "Curry Kingdom",
    cuisines: ["Indian", "South Indian", "Kerala"],
    rating: 4.5,
    cost_for_two: 450,
    is_open: true,
    address: "12 Marathahalli, Bangalore, Karnataka 560037",
    images: ["https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800"],
    menu: [
      {
        category: "Kerala Specials",
        items: [
          {
            name: "Appam with Ishtu",
            price: 220,
            description: "Lace-rimmed pancakes served with a mild vegetable or chicken stew",
            image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600"
          },
          {
            name: "Prawn Curry (Chemmeen Curry)",
            price: 350,
            description: "Tangy and spicy coconut milk-based prawn curry",
            image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b2?w=600"
          }
        ]
      },
      {
        category: "Rice & Breads",
        items: [
          {
            name: "Malabar Parotta",
            price: 60,
            description: "Layered flatbread, soft and flaky",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600"
          },
          {
            name: "Lemon Rice",
            price: 150,
            description: "Flavored rice with lemon juice, mustard seeds, and curry leaves",
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600"
          }
        ]
      }
    ]
  },
  {
    name: "BBQ Nation",
    cuisines: ["Barbecue", "Grill", "North Indian"],
    rating: 4.3,
    cost_for_two: 900,
    is_open: false,
    address: "67 Malleshwaram, Bangalore, Karnataka 560003",
    images: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"],
    menu: [
      {
        category: "Live Grill Skewers",
        items: [
          {
            name: "Cajun Spiced Potatoes",
            price: 280,
            description: "Crispy potatoes tossed in a fiery Cajun spice mix",
            image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600"
          },
          {
            name: "Chili Garlic Prawns",
            price: 450,
            description: "Marinated prawns grilled with a chili-garlic glaze",
            image: "https://images.unsplash.com/photo-1633504581886-7c94c9f49ff2?w=600"
          }
        ]
      },
      {
        category: "Main Buffet",
        items: [
          {
            name: "Mutton Biryani",
            price: 400,
            description: "A rich, slow-cooked biryani served in a handi",
            image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600"
          },
          {
            name: "Dal Bukhara",
            price: 350,
            description: "Whole black lentils, tomatoes, and spices simmered overnight",
            image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600"
          }
        ]
      }
    ]
  }
];

export const seedRestaurants = async (req: any, res: any) => {
  try {
    await Restaurant.deleteMany({});
    await Restaurant.insertMany(restaurantData);

    return res.status(200).json({
      success: true,
      message: `Successfully seeded ${restaurantData.length} restaurants`,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
