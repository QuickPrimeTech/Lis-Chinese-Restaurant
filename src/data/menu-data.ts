import type { Item } from "@/types/menu";

export const menuItems: Record<string, Item[]> = {
  soups: [
    {
      id: "soup1",
      name: "Sweet Corn Soup",
      description: "Classic sweet corn soup",
      price: 550,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758021057/imgi_260_Creamy-Corn-Soup_dybssk.jpg",
      category: "Soups",
    },
    {
      id: "soup2",
      name: "Vegetable Soup",
      description: "Fresh vegetable soup",
      price: 550,
      category: "Soups",
    },
    {
      id: "soup3",
      name: "Vegetable Hot & Sour Soup",
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758021154/imgi_146_Hot-and-sour-soup-4_yjsmz4.jpg",
      description: "Spicy and tangy vegetable hot & sour soup",
      price: 550,
      category: "Soups",
    },
    {
      id: "soup4",
      name: "Vegetable Noodle Soup",
      description: "Vegetable soup with noodles",
      price: 550,
      category: "Soups",
    },
    {
      id: "soup5",
      name: "Vegetable Wonton Soup",
      description: "Vegetable wontons in clear broth",
      price: 550,
       image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758021296/imgi_175_20201014_132914232_iOS-scaled_ugs8k7.jpg",
      category: "Soups",
    },
    {
      id: "soup6",
      name: "Mushroom Soup",
      description: "Rich mushroom soup",
      price: 550,
      category: "Soups",
    },
    {
      id: "soup7",
      name: "Tom Yum Vegetable Soup",
      description: "Thai-style Tom Yum vegetable soup",
      price: 700,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758021460/imgi_170_hm-HM-tom-yum-noodle-soup-mediumSquareAt3X_nikaa8.jpg",
      category: "Soups",
    },
    {
      id: "soup8",
      name: "Crab Meat Soup",
      description: "Fresh crab meat soup",
      price: 800,
      category: "Soups",
    },
    {
      id: "soup9",
      name: "Chicken Sweet Corn Soup",
      description: "Chicken and sweet corn soup",
      price: 650,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758021559/imgi_139_chicken-and-sweet-corn-soup-3787-1_p3lpeg.jpg",
      category: "Soups",
    },
    {
      id: "soup10",
      name: "Chicken Hot & Sour Soup",
      description: "Spicy and tangy chicken hot & sour soup",
      price: 650,
      category: "Soups",
    },
    {
      id: "soup11",
      name: "Chicken Noodle Soup",
      description: "Chicken soup with noodles",
      price: 650,
      category: "Soups",
    },
    {
      id: "soup12",
      name: "Chicken Wonton Soup",
      description: "Chicken wontons in clear broth",
      price: 650,
      category: "Soups",
    },
    {
      id: "soup13",
      name: "Chicken Mushroom Soup",
      description: "Chicken soup with mushrooms",
      price: 650,
      category: "Soups",
    },
    {
      id: "soup14",
      name: "Sea Food Soup",
      description: "Mixed seafood soup",
      price: 800,
      category: "Soups",
    },
    {
      id: "soup15a",
      name: "Tom Yum Soup with Prawns",
      description: "Thai-style Tom Yum soup with prawns",
      price: 800,
      category: "Soups",
    },
    {
      id: "soup15b",
      name: "Tom Yum Soup with Chicken",
      description: "Thai-style Tom Yum soup with chicken",
      price: 800,
      category: "Soups",
    },
    {
      id: "soup15c",
      name: "Tom Yum Soup with Beef",
      description: "Thai-style Tom Yum soup with beef",
      price: 800,
      category: "Soups",
    },
  ],
  starters: [
    {
      id: "starter1",
      name: "Vegetable Spring Rolls",
      description: "Crispy fried rolls filled with fresh vegetables.",
      price: 130,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758021824/imgi_232_Spring-Rolls-1-1-scaled_heogih.jpg",
      category: "Starters",
    },
    {
      id: "starter2",
      name: "Deep Fried Baby Corn",
      description: "Tender baby corn, lightly battered and deep-fried to a golden crisp.",
      price: 895,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758021945/imgi_144_IMG_5820_arvakz.jpg",
      category: "Starters",
    },
    {
      id: "starter3",
      name: "Chilli Cashew Nuts",
      description: "Roasted cashew nuts tossed with a savory and spicy chili blend.",
      price: 895,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758022072/imgi_144_ChiliLimeCashews_RECIPE_101421_240_ruefx5.jpg",
      category: "Starters",
    },
    {
      id: "starter4",
      name: "Vegetable Satay",
      description: "Grilled skewers of mixed vegetables served with a peanut dipping sauce.",
      price: 895,
      category: "Starters",
    },
    {
      id: "starter5",
      name: "Paneer Satay",
      description: "Marinated cottage cheese cubes grilled to perfection and served with a tangy sauce.",
      price: 1050,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758022210/imgi_122_paneer-satay-19_bfmop6.jpg",
      category: "Starters",
    },
    {
      id: "starter6",
      name: "Crispy Tofu with Chilli Garlic Sauce",
      description: "Golden fried tofu tossed in a spicy and aromatic chilli garlic sauce.",
      price: 1050,
      category: "Starters",
    },
    {
      id: "starter7",
      name: "Crispy Tofu with Salt & Pepper",
      description: "Lightly fried tofu seasoned with a classic salt and pepper mix.",
      price: 1050,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758022568/imgi_188_Fried-Salt-Pepper-Tofu_jrg77v.jpg",
      category: "Starters",
    },
    {
      id: "starter8",
      name: "Paneer with Chilli Garlic Sauce",
      description: "Cubes of paneer cooked in a spicy, rich chilli garlic sauce.",
      price: 1050,
      category: "Starters",
    },
    {
      id: "starter9",
      name: "Paneer with Salt & Pepper",
      description: "Pan-fried paneer cubes seasoned with a simple yet flavorful salt and pepper mix.",
      price: 1050,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758022469/imgi_152_pepper_paneer_5_x2bqwm.jpg",
      category: "Starters",
    },
    {
      id: "starter10",
      name: "Salt & Pepper Vegetables",
      description: "A medley of fresh vegetables, lightly fried and seasoned with salt and pepper.",
      price: 895,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758022721/imgi_169_Recipe-Banner_hriwjm.jpg",
      category: "Starters",
    },
    {
      id: "starter11",
      name: "Salt & Pepper Lady Fingers",
      description: "Crispy fried okra seasoned with a spicy salt and pepper blend.",
      price: 895,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758022378/imgi_136_Dry_2BMasala_2BBhindi_2B_281_29_2B-_2B1_uq6ijt.jpg",
      category: "Starters",
    },
    {
      id: "starter12",
      name: "Moshi Moshi (Shredded vegetables served with pancakes, spring onion, cucumber & hoisin sauce)",
      description: "A delightful dish of shredded vegetables served with thin pancakes and a savory hoisin sauce.",
      price: 1100,
      category: "Starters",
    },
    {
      id: "starter13",
      name: "Vegetable Dim Sum",
      description: "Steamed dumplings filled with a delicious mix of fresh vegetables.",
      price: 1100,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758022825/imgi_180_TGM_8880_z1pya6.jpg",
      category: "Starters",
    },
    {
      id: "starter14",
      name: "Chicken Spring Rolls",
      description: "Crispy rolls filled with shredded chicken and mixed vegetables.",
      price: 150,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758022970/imgi_220_chicken-spring-rolls-1640103502_exfvjn.jpg",
      category: "Starters",
    },
    {
      id: "starter15",
      name: "Li's Special Spring Rolls with Chicken",
      description: "Our signature spring rolls filled with a special blend of chicken and seasonings.",
      price: 180,
      category: "Starters",
    },
    {
      id: "starter16",
      name: "Li's Special Spring Rolls with Beef",
      description: "Our signature spring rolls filled with a special blend of beef and seasonings.",
      price: 180,
      category: "Starters",
    },
    {
      id: "starter17",
      name: "Spicy Chicken Wings (10 PCS)",
      description: "Crispy chicken wings tossed in a spicy, flavorful sauce.",
      price: 1100,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758023087/imgi_176_f0d1762b91fd823a1aa9bd0dab5c648d_morf5z.jpg",
      category: "Starters",
    },
    {
      id: "starter18",
      name: "Spicy Chicken Lollipop (10 PCS)",
      description: "Tender chicken drumsticks marinated and fried to perfection.",
      price: 1300,
      category: "Starters",
    },
    {
      id: "starter19",
      name: "Special Wings Stuffed with Prawns (8 PCS)",
      description: "Chicken wings carefully deboned and stuffed with a savory prawn filling.",
      price: 2400,
      category: "Starters",
    },
    {
      id: "starter20",
      name: "Li's Lamb Spare Ribs",
      description: "Succulent lamb ribs slow-cooked and glazed with our special sauce.",
      price: 1200,
      category: "Starters",
    },
    {
      id: "starter21",
      name: "Chicken Satay",
      description: "Grilled chicken skewers served with a rich and creamy peanut sauce.",
      price: 1050,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758023261/imgi_153_Beef-and-Chicken-Satay-with-peanut-sauce-scaled_bs1h5h.jpg",
      category: "Starters",
    },
    {
      id: "starter22",
      name: "Golden Fried Prawns (10 PCS)",
      description: "Prawns coated in a light, crispy batter and fried to a golden finish.",
      price: 1900,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758023443/imgi_145_DSC06475_wm_elayda.jpg",
      category: "Starters",
    },
    {
      id: "starter23",
      name: "Deep Fried Fish Fingers",
      description: "Strips of tender fish, breaded and fried until golden and crisp.",
      price: 1250,
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758023327/imgi_197_focused_149669704-stock-photo-deep-fried-fish-fingers-with_ifhq3s.jpg",
      category: "Starters",
    },
    {
      id: "starter24",
      name: "Li's Golden Squid",
      description: "Tender squid rings, lightly battered and fried to perfection.",
      price: 1900,
      category: "Starters",
    },
    {
      id: "starter25",
      name: "Li's Crispy Chicken",
      description: "Our signature crispy chicken, seasoned and fried for a perfect crunch.",
      price: 1100,
      category: "Starters",
    },
    {
      id: "starter26",
      name: "Li's Crispy Beef",
      description: "Strips of beef, marinated and fried until crispy, then tossed in a special sauce.",
      price: 1100,
      category: "Starters",
    },
    {
      id: "starter27",
      name: "Prawn in Bread Crumbs (10 PCS)",
      description: "Plump prawns coated in crispy bread crumbs and deep-fried.",
      price: 1900,
      category: "Starters",
    },
    {
      id: "starter28",
      name: "Salt & Pepper Prawns (10 PCS)",
      description: "Succulent prawns seasoned with a classic salt and pepper blend.",
      price: 1900,
      category: "Starters",
    },
    {
      id: "starter29",
      name: "Prawn Crackers",
      description: "Light and airy prawn crackers, a perfect accompaniment to any meal.",
      price: 700,
      category: "Starters",
    },
    {
      id: "starter30",
      name: "Peking Duck (Half, with pancakes, spring onions, cucumber & hoisin sauce)",
      description: "A half-portion of classic Peking duck served with all the traditional accompaniments.",
      price: 2600,
      category: "Starters",
    },
    {
      id: "starter31",
      name: "Peking Duck (Full, with pancakes, spring onions, cucumber & hoisin sauce)",
      description: "A full-sized Peking duck, prepared and served in the traditional style.",
      price: 4400,
      category: "Starters",
    },
    {
      id: "starter32",
      name: "Chicken Dim Sum",
      description: "Steamed chicken dumplings served with a special dipping sauce.",
      price: 1900,
      category: "Starters",
    },
    {
      id: "starter33",
      name: "Prawn Dim Sum",
      description: "Delicate steamed dumplings filled with succulent prawns.",
      price: 1900,
      category: "Starters",
    },
  ],
  beefDishes: [
  {
    id: "beef1",
    name: "Beef with Onions",
    description: "Tender beef stir-fried with onions in a savory sauce.",
    price: 1250,
    category: "Beef Dishes",
  },
  {
    id: "beef2",
    name: "Beef with Mushroom",
    description: "Juicy beef slices cooked with fresh mushrooms in a rich sauce.",
    price: 1250,
    image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758021668/imgi_173_beef-and-mushroom-stroganoff-76917-1_dbkj4a.jpg",
    category: "Beef Dishes",
  },
  {
    id: "beef3",
    name: "Beef with Broccoli",
    description: "Classic beef stir-fry with broccoli in a savory sauce.",
    price: 1250,
    category: "Beef Dishes",
  },
  {
    id: "beef4",
    name: "Beef with Green Pepper",
    description: "Stir-fried beef with crisp green peppers in a flavorful sauce.",
    price: 1250,
    category: "Beef Dishes",
  },
  {
    id: "beef5",
    name: "Beef in Black Bean Sauce",
    description: "Beef cooked in a rich and aromatic black bean sauce.",
    price: 1250,
    category: "Beef Dishes",
  },
  {
    id: "beef6",
    name: "Beef in Oyster Sauce",
    description: "Stir-fried beef in a savory oyster sauce.",
    price: 1250,
    category: "Beef Dishes",
  },
  {
    id: "beef7",
    name: "Chili Garlic Beef (Dry)",
    description: "Spicy dry-fried beef with chili and garlic.",
    price: 1400,
    category: "Beef Dishes",
  },
  {
    id: "beef8",
    name: "Chili Garlic Beef (With Sauce)",
    description: "Beef stir-fried with chili and garlic in a rich sauce.",
    price: 1400,
    category: "Beef Dishes",
  },
  {
    id: "beef9",
    name: "Sizzling Beef",
    description: "Hot sizzling beef cooked with special spices.",
    price: 1450,
    category: "Beef Dishes",
  },
  {
    id: "beef10",
    name: "Shredded Beef with Beansprouts",
    description: "Shredded beef stir-fried with fresh beansprouts.",
    price: 1250,
    category: "Beef Dishes",
  },
],
lambDishes: [
  {
    id: "lamb1",
    name: "Lamb with Onion",
    description: "Tender lamb stir-fried with onions in a savory sauce.",
    price: 1250,
    category: "Lamb Dishes",
  },
  {
    id: "lamb2",
    name: "Lamb with Mushroom",
    description: "Juicy lamb slices cooked with fresh mushrooms in a rich sauce.",
    price: 1250,
    category: "Lamb Dishes",
  },
  {
    id: "lamb3",
    name: "Lamb with Broccoli",
    description: "Classic lamb stir-fry with broccoli in a savory sauce.",
    price: 1250,
    category: "Lamb Dishes",
  },
  {
    id: "lamb4",
    name: "Lamb with Green Pepper",
    description: "Stir-fried lamb with crisp green peppers in a flavorful sauce.",
    price: 1250,
    category: "Lamb Dishes",
  },
  {
    id: "lamb5",
    name: "Lamb in Black Bean Sauce",
    description: "Lamb cooked in a rich and aromatic black bean sauce.",
    price: 1250,
    category: "Lamb Dishes",
  },
  {
    id: "lamb6",
    name: "Schezwan Lamb",
    description: "Spicy Szechwan-style lamb stir-fry with bold flavors.",
    price: 1250,
    category: "Lamb Dishes",
  },
  {
    id: "lamb7",
    name: "Dry Chilli Garlic Lamb",
    description: "Spicy dry-fried lamb with chili and garlic.",
    price: 1400,
    category: "Lamb Dishes",
  },
  {
    id: "lamb8",
    name: "Shredded Lamb with Beansprouts",
    description: "Thinly shredded lamb stir-fried with fresh beansprouts.",
    price: 1250,
    category: "Lamb Dishes",
  },
  {
    id: "lamb9",
    name: "Shredded Lamb with Beansprouts (Special)",
    description: "Shredded lamb cooked with beansprouts in a special style.",
    price: 1500,
    category: "Lamb Dishes",
  },
],
seafood: [
    {
      id: "seafood71",
      name: "Dry Chilli Garlic Prawns",
      description: "Succulent prawns tossed in a fiery dry chilli and garlic sauce.",
      price: 1900,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood72",
      name: "Prawns in Chilli Garlic Sauce",
      description: "Plump prawns bathed in a rich and aromatic chilli garlic sauce.",
      price: 1900,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood73",
      name: "Shanghai Style Prawns",
      description: "A classic Shanghai dish featuring sweet and tender prawns.",
      price: 1900,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood74",
      name: "Prawns in Schezwan Sauce",
      description: "Juicy prawns stir-fried in a bold and spicy Schezwan sauce.",
      price: 1900,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood75",
      name: "Li's Prawn Hot Pot with Cashewnuts",
      description: "A flavorful hot pot with prawns and crunchy cashewnuts.",
      price: 1900,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood76",
      name: "Sizzling Prawns",
      description: "Prawns served on a sizzling hot plate with a savory sauce.",
      price: 2000,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood77",
      name: "Lemon Prawns",
      description: "Lightly battered prawns in a refreshing and zesty lemon sauce.",
      price: 1900,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood78",
      name: "Sweet & Sour Prawns",
      description: "Prawns coated in a classic tangy sweet and sour sauce with bell peppers and pineapple.",
      price: 1900,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood79",
      name: "Sweet & Sour Fish",
      description: "Crispy fried fish pieces in a delightful sweet and sour sauce.",
      price: 1350,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood80",
      name: "Shanghai Style Fish",
      description: "Tender fish fillets prepared in an authentic Shanghai-style sauce.",
      price: 1350,
      category: "Sea Food Dishes"
    },
    {
      id: "seafood81",
      name: "Schezwan Spicy Fish",
      description: "Fish fillets stir-fried in a fiery and numbing Schezwan sauce.",
      price: 1350,
      category: "Sea Food Dishes"
    }
  ],
  vegetableDishes: [
    {
      id: "veg93",
      name: "Mixed Vegetables",
      description: "A vibrant stir-fry of fresh, seasonal mixed vegetables.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg94",
      name: "Stir Fried Pak Choi",
      description: "Tender pak choi quickly stir-fried with garlic and a light sauce.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg95",
      name: "Stir Fried Beansprouts",
      description: "Crisp beansprouts stir-fried for a light and refreshing dish.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg96",
      name: "Stir Fried Chinese Salad",
      description: "A medley of fresh Chinese vegetables, stir-fried to perfection.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg97",
      name: "Stir Fried Snow Peas",
      description: "Sweet and crisp snow peas stir-fried with a delicate sauce.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg98",
      name: "Garlic Broccoli",
      description: "Fresh broccoli florets stir-fried with aromatic garlic.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg99",
      name: "Schezwan Eggplant",
      description: "Tender eggplant pieces in a bold and spicy Schezwan sauce.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg100",
      name: "Special Green Vegetables",
      description: "Our chef's selection of fresh green vegetables, prepared in a special house sauce.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg101",
      name: "Chilli Garlic French Beans",
      description: "Crisp French beans stir-fried with spicy chilli and fragrant garlic.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg102",
      name: "Chilli Corn",
      description: "Sweet corn kernels stir-fried with a spicy and flavorful chilli sauce.",
      price: 1150,
      category: "Vegetable Dishes"
    },
    {
      id: "veg103",
      name: "Tofu in Black Sauce",
      description: "Soft tofu cubes braised in a rich and savory black bean sauce.",
      price: 1200,
      category: "Vegetable Dishes"
    },
    {
      id: "veg104",
      name: "Vegetables Fu-Yung",
      description: "A classic dish of vegetables cooked in a light and fluffy egg batter.",
      price: 1200,
      category: "Vegetable Dishes"
    },
    {
      id: "veg105",
      name: "Mapau Tofu (Pili-Pili Tofu)",
      description: "Tender tofu and vegetables in a spicy and aromatic Mapau sauce.",
      price: 1350,
      category: "Vegetable Dishes"
    },
    {
      id: "veg106",
      name: "Home Cooked Tofu",
      description: "Tofu and mixed vegetables stir-fried in a traditional home-style sauce.",
      price: 1350,
      category: "Vegetable Dishes"
    },
    {
      id: "veg107",
      name: "Mixed Vegetables Hot Pot",
      description: "A hearty and warming hot pot filled with a variety of fresh vegetables.",
      price: 1350,
      category: "Vegetable Dishes"
    },
    {
      id: "veg108",
      name: "Vegetables Manchurian",
      description: "Vegetable dumplings in a spicy, tangy Manchurian sauce.",
      price: 1200,
      category: "Vegetable Dishes"
    },
    {
      id: "veg109",
      name: "Sizzling Mixed Vegetables",
      description: "A medley of vegetables served sizzling on a hot plate.",
      price: 1400,
      category: "Vegetable Dishes"
    },
    {
      id: "veg110",
      name: "Kung Pao Vegetables with Cashewnuts",
      description: "A savory and slightly sweet Kung Pao dish with vegetables and crunchy cashewnuts.",
      price: 1400,
      category: "Vegetable Dishes"
    }
  ],
  riceNoodles: [
    {
      id: "rn111",
      name: "Steamed Rice",
      description: "Perfectly cooked, fluffy steamed rice.",
      price: 700,
      category: "Rice & Noodles"
    },
    {
      id: "rn112",
      name: "Plain Fried Rice",
      description: "Simple yet delicious fried rice with a touch of seasoning.",
      price: 700,
      category: "Rice & Noodles"
    },
    {
      id: "rn113",
      name: "Vegetable Fried Rice",
      description: "Wok-fried rice with a colorful mix of fresh vegetables.",
      price: 750,
      category: "Rice & Noodles"
    },
    {
      id: "rn114a",
      name: "Fried Rice with Egg",
      description: "Classic fried rice with scrambled egg.",
      price: 900,
      category: "Rice & Noodles"
    },
    {
      id: "rn114b",
      name: "Fried Rice with Cashew Nuts",
      description: "Fried rice with the added crunch of toasted cashew nuts.",
      price: 900,
      category: "Rice & Noodles"
    },
    {
      id: "rn115a",
      name: "Special Rice with Prawns",
      description: "Our special fried rice with succulent prawns.",
      price: 950,
      category: "Rice & Noodles"
    },
    {
      id: "rn115b",
      name: "Special Rice with Chicken",
      description: "Our special fried rice with tender pieces of chicken.",
      price: 950,
      category: "Rice & Noodles"
    },
    {
      id: "rn115c",
      name: "Special Rice with Prawns & Chicken",
      description: "Our special fried rice with both prawns and chicken.",
      price: 950,
      category: "Rice & Noodles"
    },
    {
      id: "rn116",
      name: "Vegetable Fried Noodles",
      description: "Stir-fried noodles with a medley of fresh vegetables.",
      price: 750,
      category: "Rice & Noodles"
    },
    {
      id: "rn117",
      name: "Chicken Fried Noodles",
      description: "Stir-fried noodles with savory chicken pieces.",
      price: 900,
      category: "Rice & Noodles"
    },
    {
      id: "rn118",
      name: "Chilli Garlic Noodles",
      description: "Noodles tossed in a spicy and aromatic chilli garlic sauce.",
      price: 750,
      category: "Rice & Noodles"
    },
    {
      id: "rn119",
      name: "Singapore Noodles",
      description: "Thin rice noodles stir-fried with curry powder and vegetables.",
      price: 750,
      category: "Rice & Noodles"
    },
    {
      id: "rn120",
      name: "Plain Fried Noodles",
      description: "Simple stir-fried noodles seasoned to perfection.",
      price: 750,
      category: "Rice & Noodles"
    }
  ]
};