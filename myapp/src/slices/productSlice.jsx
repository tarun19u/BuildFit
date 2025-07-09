import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [
    // STRENGTH EQUIPMENT
    {
      id: 1,
      name: "Adjustable Dumbbell Set",
      price: 125,
      description: "Professional grade adjustable dumbbells for home workouts",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.5,
      image: "/assets/dumbells.jpg"
    },
    {
      id: 2,
      name: "Hyperextension Machine",
      price: 450,
      description: "Heavy-duty hyperextension bench for lower back strengthening",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.6,
      image: "/assets/hyperextention.jpg"
    },
    {
      id: 3,
      name: "Olympic Barbell Rod",
      price: 180,
      description: "Professional 7ft Olympic barbell rod for heavy lifting",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.8,
      image: "/assets/rod.jpg"
    },
    {
      id: 4,
      name: "Incline Bench Press",
      price: 650,
      description: "Adjustable incline bench press for upper chest development",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.7,
      image: "/assets/inclinebench.jpg"
    },
    {
      id: 5,
      name: "Decline Bench Press",
      price: 620,
      description: "Professional decline bench for lower chest targeting",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.5,
      image: "/assets/declinebench.jpg"
    },
    {
      id: 6,
      name: "Flat Bench Press",
      price: 580,
      description: "Heavy-duty flat bench press for classic chest workouts",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.8,
      image: "/assets/flatbench.jpg"
    },
    {
      id: 7,
      name: "Shoulder Press Machine",
      price: 750,
      description: "Seated shoulder press machine for safe overhead pressing",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.6,
      image: "/assets/shoulderpress.jpg"
    },
    {
      id: 8,
      name: "Leg Extension Machine",
      price: 680,
      description: "Isolated leg extension machine for quadriceps development",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.4,
      image: "/assets/legetention.jpg"
    },
    {
      id: 36,
      name: "Hyper Extension Machine",
      price: 680,
      description: "Hyper extention for lower back",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.9,
      image: "/assets/hyperextention.jpg"
    },
    {
      id: 9,
      name: "Leg Curl Machine",
      price: 720,
      description: "Hamstring curl machine for posterior chain strength",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.5,
      image: "/assets/legextentionandcurl.jpg"
    },
    {
      id: 10,
      name: "Leg Press Machine",
      price: 1200,
      description: "45-degree leg press machine for lower body power",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.9,
      image: "/assets/legpress.jpg"
    },
    {
      id: 11,
      name: "Lat Pulldown Machine",
      price: 850,
      description: "Cable lat pulldown machine for back development",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.7,
      image: "/assets/latpulldownmacine.jpg"
    },
    {
      id: 12,
      name: "T-Bar Chest Machine",
      price: 920,
      description: "T-bar chest press machine for controlled chest workouts",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.6,
      image: "/assets/Tbarrow.jpg"
    },
    {
      id: 13,
      name: "Seated Row Machine",
      price: 780,
      description: "Cable seated row machine for back and rear deltoid training",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.5,
      image: "/assets/seatedrow.jpg"
    },
    {
      id: 14,
      name: "Thigh Abductor Machine",
      price: 650,
      description: "Hip abductor/adductor machine for inner and outer thigh",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.3,
      image: "/assets/thighabductor.jpg"
    },
    {
      id: 15,
      name: "Bicep Curl Machine",
      price: 480,
      description: "Isolated bicep curl machine for arm development",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.4,
      image: "/assets/preachercurl (2).jpg"
    },
    {
      id: 16,
      name: "Tricep Extension Machine",
      price: 520,
      description: "Overhead tricep extension machine for arm definition",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.5,
      image: "/assets/tricep.jpg"
    },
    {
      id: 17,
      name: "Pull-Up/Chin-Up Station",
      price: 280,
      description: "Multi-grip pull-up and chin-up station for upper body",
      category: "Strength Equipment",
      inStock: true,
      rating: 4.6,
      image: "/assets/chinup.jpg"
    },

    {
      id: 18,
      name: "Smart Treadmill",
      price: 1200,
      description: "High-tech treadmill with built-in workout programs",
      category: "Cardio Equipment",
      inStock: true,
      rating: 4.3,
      image: "/assets/treadmil.jpg"
    },
    {
      id: 19,
      name: "Exercise Bike",
      price: 450,
      description: "Stationary exercise bike for cardio training",
      category: "Cardio Equipment",
      inStock: true,
      rating: 4.4,
      image: "/assets/cycle.jpg"
    },
    {
      id: 20,
      name: "Stair Climber",
      price: 800,
      description: "Commercial-grade stair climber for intense cardio",
      category: "Cardio Equipment",
      inStock: true,
      rating: 4.2,
      image: "/assets/stairmaster.jpg"
    },

    // BOXING EQUIPMENT
    {
      id: 21,
      name: "Heavy Boxing Bag",
      price: 180,
      description: "Professional heavy bag for boxing and martial arts training",
      category: "Boxing Equipment",
      inStock: true,
      rating: 4.7,
      image: "/assets/boxingbag.jpg"
    },
    {
      id: 22,
      name: "Boxing Gloves",
      price: 45,
      description: "Premium leather boxing gloves for training and sparring",
      category: "Boxing Equipment",
      inStock: true,
      rating: 4.5,
      image: "/assets/boxinggloves.jpg"
    },

    {
      id: 23,
      name: "Whey Protein Powder",
      price: 50,
      description: "Premium whey protein for muscle building and recovery",
      category: "Supplements",
      inStock: true,
      rating: 4.8,
      image: "/assets/whey.png"
    },
    {
      id: 24,
      name: "Protein Shaker Bottle",
      price: 12,
      description: "BPA-free protein shaker with mixing ball",
      category: "Accessories",
      inStock: true,
      rating: 4.3,
      image: "/assets/shaker.png"
    },

    {
      id: 25,
      name: "Gym T-Shirt",
      price: 25,
      description: "Moisture-wicking performance t-shirt for workouts",
      category: "Apparel",
      inStock: true,
      rating: 4.4,
      image: "/assets/tshirt.png"
    },
    {
      id: 26,
      name: "Athletic Shorts",
      price: 30,
      description: "Comfortable athletic shorts with moisture management",
      category: "Apparel",
      inStock: true,
      rating: 4.5,
      image: "/assets/shorts.png"
    },
    {
      id: 27,
      name: "Training Shoes",
      price: 85,
      description: "Cross-training shoes for gym and fitness activities",
      category: "Apparel",
      inStock: true,
      rating: 4.6,
      image: "/assets/shoes.png"
    },
    {
      id: 28,
      name: "Workout Gloves",
      price: 18,
      description: "Padded workout gloves for better grip and protection",
      category: "Accessories",
      inStock: true,
      rating: 4.2,
      image: "/assets/workoutgloves.jpg"
    },

    // ACCESSORIES
    {
      id: 29,
      name: "Gym Towel",
      price: 15,
      description: "Quick-dry microfiber gym towel for workouts",
      category: "Accessories",
      inStock: true,
      rating: 4.3,
      image: "/assets/towel.jpeg"
    },
    {
      id: 30,
      name: "Water Bottle",
      price: 20,
      description: "Insulated stainless steel water bottle for hydration",
      category: "Accessories",
      inStock: true,
      rating: 4.5,
      image: "/assets/bottle.jpg"
    },
    {
      id: 31,
      name: "Yoga Mat Premium",
      price: 35,
      description: "Non-slip premium yoga mat for all types of workouts",
      category: "Accessories",
      inStock: true,
      rating: 4.7,
      image: "/assets/yogamat.jpg"
    },
    {
      id: 32,
      name: "Exercise Ball",
      price: 25,
      description: "Anti-burst exercise ball for core training and stretching",
      category: "Accessories",
      inStock: true,
      rating: 4.4,
      image: "/assets/ball.jpg"
    },

    {
      id: 33,
      name: "Fitness Training Guide",
      price: 15,
      description: "Complete guide to fitness training and nutrition",
      category: "Books",
      inStock: true,
      rating: 4.6,
      image: "/assets/book.png"
    },

    // SUPPLEMENTS
    {
      id: 34,
      name: "Pre-Workout Energy",
      price: 28,
      description: "Natural pre-workout supplement for enhanced performance",
      category: "Supplements",
      inStock: false,
      rating: 4.4,
      image: "/assets/preworkout.png"
    }
  ],
  reducers: {}
});

export default productSlice.reducer;
