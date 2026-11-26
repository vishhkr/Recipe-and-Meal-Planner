/*
 * RECIPENEST — RECIPE DATA
 * ------------------------------------------------------------
 * This file defines the RECIPES array used by the website.
 * Keep each recipe object consistent with the existing fields
 * so the recipe cards, filters and nutrition estimates can use it.
 */


/*
==================================================
RECIPENEST V1 - RECIPE DATABASE
75 starter recipes

To add a recipe:
Copy one recipe object, change its values,
and add a comma between recipe objects.
==================================================
*/

const RECIPES = [

/* =============== BREAKFAST =============== */

{
 id: 1, name: "Masala Omelette Toast",
 category: "Breakfast",
 ingredients: ["eggs", "onion", "tomato", "bread"],
 calories: 320, minutes: 15,
 description: "A spicy Indian omelette served with toast."
},
{
 id: 2, name: "Banana Peanut Oats",
 category: "Breakfast",
 ingredients: ["oats", "banana", "milk", "peanut butter"],
 calories: 390, minutes: 10,
 description: "Creamy oats with banana and peanut butter."
},
{
 id: 3, name: "Paneer Bhurji",
 category: "Breakfast",
 ingredients: ["paneer", "onion", "tomato", "bread"],
 calories: 410, minutes: 20,
 description: "Indian scrambled paneer with spices."
},
{
 id: 4, name: "Vegetable Poha",
 category: "Breakfast",
 ingredients: ["poha", "onion", "peas", "peanuts"],
 calories: 330, minutes: 20,
 description: "Light flattened rice with vegetables."
},
{
 id: 5, name: "Besan Chilla",
 category: "Breakfast",
 ingredients: ["besan", "onion", "tomato", "curd"],
 calories: 300, minutes: 20,
 description: "Savory gram flour pancakes."
},
{
 id: 6, name: "Greek Yogurt Bowl",
 category: "Breakfast",
 ingredients: ["yogurt", "banana", "berries", "honey"],
 calories: 280, minutes: 5,
 description: "A refreshing fruit and yogurt bowl."
},
{
 id: 7, name: "Spinach Cheese Sandwich",
 category: "Breakfast",
 ingredients: ["bread", "spinach", "cheese", "tomato"],
 calories: 350, minutes: 12,
 description: "Toasted sandwich with spinach and cheese."
},
{
 id: 8, name: "Aloo Paratha",
 category: "Breakfast",
 ingredients: ["potato", "wheat flour", "curd", "spices"],
 calories: 430, minutes: 30,
 description: "Classic Indian stuffed potato flatbread."
},
{
 id: 9, name: "Overnight Chia Oats",
 category: "Breakfast",
 ingredients: ["oats", "milk", "chia seeds", "banana"],
 calories: 360, minutes: 5,
 description: "No-cook overnight oats with chia seeds."
},
{
 id: 10, name: "Moong Dal Cheela",
 category: "Breakfast",
 ingredients: ["moong dal", "ginger", "onion", "curd"],
 calories: 310, minutes: 25,
 description: "Protein-rich savory lentil pancakes."
},
{
 id: 11, name: "Peanut Butter Banana Wrap",
 category: "Breakfast",
 ingredients: ["tortilla", "peanut butter", "banana"],
 calories: 340, minutes: 5,
 description: "A quick sweet breakfast wrap."
},
{
 id: 12, name: "Idli Sambar",
 category: "Breakfast",
 ingredients: ["idli", "sambar", "lentils", "vegetables"],
 calories: 360, minutes: 25,
 description: "South Indian steamed idlis with sambar."
},
{
 id: 13, name: "Apple Cinnamon Porridge",
 category: "Breakfast",
 ingredients: ["oats", "apple", "milk", "cinnamon"],
 calories: 290, minutes: 12,
 description: "Warm porridge with apple and cinnamon."
},
{
 id: 14, name: "Sprouts Chaat",
 category: "Breakfast",
 ingredients: ["sprouts", "tomato", "onion", "lemon"],
 calories: 240, minutes: 10,
 description: "Tangy and crunchy sprouts chaat."
},
{
 id: 15, name: "Avocado Egg Toast",
 category: "Breakfast",
 ingredients: ["bread", "avocado", "eggs", "lemon"],
 calories: 370, minutes: 12,
 description: "Creamy avocado with a perfectly cooked egg."
},


/* =============== LUNCH =============== */

{
 id: 16, name: "Chickpea Salad Bowl",
 category: "Lunch",
 ingredients: ["chickpeas", "cucumber", "tomato", "lemon"],
 calories: 390, minutes: 15,
 description: "Fresh chickpea salad with lemon dressing."
},
{
 id: 17, name: "Paneer Tikka Wrap",
 category: "Lunch",
 ingredients: ["paneer", "tortilla", "yogurt", "capsicum"],
 calories: 480, minutes: 25,
 description: "Spiced paneer wrapped in a soft tortilla."
},
{
 id: 18, name: "Rajma Rice Bowl",
 category: "Lunch",
 ingredients: ["kidney beans", "rice", "onion", "tomato"],
 calories: 520, minutes: 35,
 description: "Comforting kidney bean curry with rice."
},
{
 id: 19, name: "Lemon Rice",
 category: "Lunch",
 ingredients: ["rice", "lemon", "peanuts", "curry leaves"],
 calories: 390, minutes: 20,
 description: "South Indian lemon-flavored rice."
},
{
 id: 20, name: "Vegetable Pulao",
 category: "Lunch",
 ingredients: ["rice", "peas", "carrot", "beans"],
 calories: 420, minutes: 30,
 description: "Fragrant rice cooked with vegetables."
},
{
 id: 21, name: "Dal Tadka Rice",
 category: "Lunch",
 ingredients: ["lentils", "rice", "tomato", "onion"],
 calories: 490, minutes: 35,
 description: "Lentils with a flavorful Indian tempering."
},
{
 id: 22, name: "Caprese Sandwich",
 category: "Lunch",
 ingredients: ["bread", "tomato", "mozzarella", "basil"],
 calories: 410, minutes: 10,
 description: "Fresh Italian-inspired tomato cheese sandwich."
},
{
 id: 23, name: "Tuna Cucumber Bowl",
 category: "Lunch",
 ingredients: ["tuna", "cucumber", "rice", "lemon"],
 calories: 430, minutes: 15,
 description: "A refreshing tuna and rice bowl."
},
{
 id: 24, name: "Tofu Stir Fry",
 category: "Lunch",
 ingredients: ["tofu", "broccoli", "carrot", "soy sauce"],
 calories: 360, minutes: 20,
 description: "Quick tofu stir fry with crunchy vegetables."
},
{
 id: 25, name: "Chicken Burrito Bowl",
 category: "Lunch",
 ingredients: ["chicken", "rice", "beans", "tomato"],
 calories: 560, minutes: 30,
 description: "A filling Mexican-inspired rice bowl."
},
{
 id: 26, name: "Hummus Veggie Pita",
 category: "Lunch",
 ingredients: ["pita", "hummus", "cucumber", "tomato"],
 calories: 380, minutes: 10,
 description: "Fresh vegetables with creamy hummus."
},
{
 id: 27, name: "Egg Fried Rice",
 category: "Lunch",
 ingredients: ["rice", "eggs", "peas", "soy sauce"],
 calories: 450, minutes: 15,
 description: "Quick fried rice with egg and vegetables."
},
{
 id: 28, name: "Mediterranean Couscous",
 category: "Lunch",
 ingredients: ["couscous", "cucumber", "tomato", "chickpeas"],
 calories: 420, minutes: 20,
 description: "Mediterranean-inspired couscous salad."
},
{
 id: 29, name: "Sweet Potato Bean Bowl",
 category: "Lunch",
 ingredients: ["sweet potato", "black beans", "corn", "lime"],
 calories: 460, minutes: 30,
 description: "A colorful bowl with beans and sweet potato."
},
{
 id: 30, name: "Mushroom Pasta",
 category: "Lunch",
 ingredients: ["pasta", "mushrooms", "garlic", "cream"],
 calories: 510, minutes: 25,
 description: "Creamy pasta with sautéed mushrooms."
},
{
 id: 31, name: "Grilled Chicken Salad",
 category: "Lunch",
 ingredients: ["chicken", "lettuce", "tomato", "cucumber"],
 calories: 390, minutes: 20,
 description: "Grilled chicken with fresh salad vegetables."
},
{
 id: 32, name: "Spinach Corn Quesadilla",
 category: "Lunch",
 ingredients: ["tortilla", "spinach", "corn", "cheese"],
 calories: 440, minutes: 15,
 description: "Crispy tortilla with spinach, corn and cheese."
},
{
 id: 33, name: "Soya Keema Wrap",
 category: "Lunch",
 ingredients: ["soya chunks", "tortilla", "onion", "tomato"],
 calories: 470, minutes: 25,
 description: "Spiced soya filling in a soft wrap."
},
{
 id: 34, name: "Tomato Basil Pasta",
 category: "Lunch",
 ingredients: ["pasta", "tomato", "garlic", "basil"],
 calories: 430, minutes: 20,
 description: "Simple pasta with fresh tomato sauce."
},
{
 id: 35, name: "Quinoa Chickpea Bowl",
 category: "Lunch",
 ingredients: ["quinoa", "chickpeas", "cucumber", "lemon"],
 calories: 450, minutes: 25,
 description: "Nutritious quinoa and chickpea salad bowl."
},


/* =============== DINNER =============== */

{
 id: 36, name: "Chana Masala",
 category: "Dinner",
 ingredients: ["chickpeas", "onion", "tomato", "rice"],
 calories: 500, minutes: 35,
 description: "Classic Indian chickpea curry."
},
{
 id: 37, name: "Palak Paneer",
 category: "Dinner",
 ingredients: ["paneer", "spinach", "tomato", "cream"],
 calories: 470, minutes: 30,
 description: "Paneer in a creamy spinach gravy."
},
{
 id: 38, name: "Vegetable Khichdi",
 category: "Dinner",
 ingredients: ["rice", "moong dal", "carrot", "peas"],
 calories: 400, minutes: 30,
 description: "Comforting one-pot rice and lentil meal."
},
{
 id: 39, name: "Chicken Tomato Curry",
 category: "Dinner",
 ingredients: ["chicken", "tomato", "onion", "rice"],
 calories: 540, minutes: 35,
 description: "Chicken cooked in a rich tomato curry."
},
{
 id: 40, name: "Garlic Butter Noodles",
 category: "Dinner",
 ingredients: ["noodles", "garlic", "butter", "spring onion"],
 calories: 460, minutes: 15,
 description: "Quick noodles with fragrant garlic butter."
},
{
 id: 41, name: "Baked Potato with Beans",
 category: "Dinner",
 ingredients: ["potato", "kidney beans", "cheese", "tomato"],
 calories: 480, minutes: 45,
 description: "Baked potato with a hearty bean topping."
},
{
 id: 42, name: "Tofu Coconut Curry",
 category: "Dinner",
 ingredients: ["tofu", "coconut milk", "spinach", "rice"],
 calories: 520, minutes: 30,
 description: "Creamy coconut curry with tofu."
},
{
 id: 43, name: "Lentil Soup",
 category: "Dinner",
 ingredients: ["lentils", "carrot", "onion", "tomato"],
 calories: 330, minutes: 35,
 description: "Warm and filling homemade lentil soup."
},
{
 id: 44, name: "Stuffed Bell Peppers",
 category: "Dinner",
 ingredients: ["capsicum", "rice", "corn", "beans"],
 calories: 420, minutes: 40,
 description: "Bell peppers filled with rice and vegetables."
},
{
 id: 45, name: "Paneer Fried Rice",
 category: "Dinner",
 ingredients: ["paneer", "rice", "peas", "soy sauce"],
 calories: 500, minutes: 20,
 description: "Indian-style fried rice with paneer."
},
{
 id: 46, name: "Chicken Fajitas",
 category: "Dinner",
 ingredients: ["chicken", "capsicum", "onion", "tortilla"],
 calories: 510, minutes: 25,
 description: "Seasoned chicken with colorful peppers."
},
{
 id: 47, name: "Pumpkin Soup",
 category: "Dinner",
 ingredients: ["pumpkin", "onion", "milk", "garlic"],
 calories: 290, minutes: 30,
 description: "Smooth and creamy pumpkin soup."
},
{
 id: 48, name: "Vegetable Burger",
 category: "Dinner",
 ingredients: ["burger bun", "potato", "beans", "lettuce"],
 calories: 490, minutes: 35,
 description: "Homemade vegetable burger."
},
{
 id: 49, name: "Soba Noodle Bowl",
 category: "Dinner",
 ingredients: ["soba noodles", "tofu", "carrot", "soy sauce"],
 calories: 440, minutes: 20,
 description: "Japanese-inspired noodle bowl."
},
{
 id: 50, name: "Matar Paneer",
 category: "Dinner",
 ingredients: ["paneer", "peas", "tomato", "onion"],
 calories: 480, minutes: 30,
 description: "Paneer and green peas in tomato gravy."
},
{
 id: 51, name: "Cabbage Chickpea Stir Fry",
 category: "Dinner",
 ingredients: ["cabbage", "chickpeas", "garlic", "lemon"],
 calories: 350, minutes: 18,
 description: "Quick cabbage and chickpea stir fry."
},
{
 id: 52, name: "Roasted Salmon",
 category: "Dinner",
 ingredients: ["salmon", "potato", "broccoli", "lemon"],
 calories: 560, minutes: 30,
 description: "Oven-roasted salmon with vegetables."
},
{
 id: 53, name: "Vegetable Ramen",
 category: "Dinner",
 ingredients: ["noodles", "mushrooms", "spinach", "soy sauce"],
 calories: 420, minutes: 20,
 description: "Warm vegetable ramen noodle soup."
},
{
 id: 54, name: "Egg Curry",
 category: "Dinner",
 ingredients: ["eggs", "tomato", "onion", "rice"],
 calories: 470, minutes: 30,
 description: "Boiled eggs in a spiced tomato gravy."
},
{
 id: 55, name: "Corn Spinach Pasta",
 category: "Dinner",
 ingredients: ["pasta", "corn", "spinach", "milk"],
 calories: 450, minutes: 25,
 description: "Creamy pasta with corn and spinach."
},


/* =============== SNACKS =============== */

{
 id: 56, name: "Cucumber Hummus Bites",
 category: "Snack",
 ingredients: ["cucumber", "hummus", "paprika"],
 calories: 130, minutes: 5,
 description: "Crunchy cucumber with creamy hummus."
},
{
 id: 57, name: "Roasted Chickpeas",
 category: "Snack",
 ingredients: ["chickpeas", "olive oil", "paprika"],
 calories: 180, minutes: 25,
 description: "Crunchy roasted chickpeas with spices."
},
{
 id: 58, name: "Apple Peanut Butter",
 category: "Snack",
 ingredients: ["apple", "peanut butter"],
 calories: 190, minutes: 5,
 description: "Fresh apple slices with peanut butter."
},
{
 id: 59, name: "Mango Yogurt Smoothie",
 category: "Snack",
 ingredients: ["mango", "yogurt", "milk"],
 calories: 220, minutes: 5,
 description: "Refreshing mango smoothie."
},
{
 id: 60, name: "Boiled Egg Chaat",
 category: "Snack",
 ingredients: ["eggs", "onion", "tomato", "lemon"],
 calories: 170, minutes: 12,
 description: "Boiled eggs with tangy chaat seasoning."
},
{
 id: 61, name: "Carrot Cucumber Sticks",
 category: "Snack",
 ingredients: ["carrot", "cucumber", "hummus"],
 calories: 120, minutes: 5,
 description: "Fresh vegetable sticks with hummus."
},
{
 id: 62, name: "Date Energy Bites",
 category: "Snack",
 ingredients: ["dates", "oats", "peanut butter"],
 calories: 210, minutes: 10,
 description: "No-bake energy bites made with dates."
},
{
 id: 63, name: "Berry Banana Smoothie",
 category: "Snack",
 ingredients: ["berries", "banana", "milk"],
 calories: 200, minutes: 5,
 description: "Fruit smoothie with banana and berries."
},
{
 id: 64, name: "Paneer Chaat",
 category: "Snack",
 ingredients: ["paneer", "tomato", "onion", "lemon"],
 calories: 220, minutes: 8,
 description: "Fresh paneer with Indian chaat flavors."
},
{
 id: 65, name: "Sweet Corn Chaat",
 category: "Snack",
 ingredients: ["corn", "tomato", "lemon", "chilli"],
 calories: 160, minutes: 10,
 description: "Spicy sweet corn with lemon."
},
{
 id: 66, name: "Tomato Cheese Toast",
 category: "Snack",
 ingredients: ["bread", "tomato", "cheese"],
 calories: 210, minutes: 8,
 description: "Quick toasted bread with tomato and cheese."
},
{
 id: 67, name: "Trail Mix Cup",
 category: "Snack",
 ingredients: ["almonds", "raisins", "pumpkin seeds"],
 calories: 200, minutes: 2,
 description: "A crunchy mixture of nuts and seeds."
},
{
 id: 68, name: "Banana Oat Pancakes",
 category: "Snack",
 ingredients: ["banana", "oats", "eggs", "milk"],
 calories: 280, minutes: 15,
 description: "Soft pancakes made with banana and oats."
},
{
 id: 69, name: "Lemon Mint Cooler",
 category: "Snack",
 ingredients: ["lemon", "mint", "honey"],
 calories: 70, minutes: 5,
 description: "Refreshing lemon and mint drink."
},
{
 id: 70, name: "Edamame Snack Bowl",
 category: "Snack",
 ingredients: ["edamame", "salt", "lemon"],
 calories: 190, minutes: 8,
 description: "Simple edamame with lemon and seasoning."
},
{
 id: 71, name: "Moong Dal Salad",
 category: "Snack",
 ingredients: ["moong dal", "cucumber", "tomato", "lemon"],
 calories: 210, minutes: 12,
 description: "Fresh lentil salad with crunchy vegetables."
},
{
 id: 72, name: "Peanut Masala",
 category: "Snack",
 ingredients: ["peanuts", "onion", "tomato", "lemon"],
 calories: 190, minutes: 8,
 description: "Tangy Indian peanut snack."
},
{
 id: 73, name: "Fruit Chaat",
 category: "Snack",
 ingredients: ["apple", "banana", "orange", "lemon"],
 calories: 150, minutes: 8,
 description: "Mixed fresh fruit with tangy seasoning."
},
{
 id: 74, name: "Masala Makhana",
 category: "Snack",
 ingredients: ["makhana", "ghee", "spices"],
 calories: 140, minutes: 10,
 description: "Crispy roasted fox nuts with spices."
},
{
 id: 75, name: "Vegetable Sandwich",
 category: "Snack",
 ingredients: ["bread", "cucumber", "tomato", "butter"],
 calories: 230, minutes: 10,
 description: "A classic fresh vegetable sandwich."
}

,
{ id: 76, name: "Mango Lassi", category: "Drinks", cuisine: "Indian", ingredients: ["mango", "yogurt", "milk", "cardamom"], calories: 210, minutes: 5, description: "A chilled mango and yogurt drink." },
{ id: 77, name: "Sweet Lime Soda", category: "Drinks", cuisine: "Indian", ingredients: ["sweet lime", "soda water", "sugar", "mint"], calories: 95, minutes: 5, description: "A bright citrus cooler with bubbles." },
{ id: 78, name: "Masala Chai", category: "Drinks", cuisine: "Indian", ingredients: ["tea", "milk", "water", "sugar", "ginger", "spices"], calories: 120, minutes: 10, description: "Black tea simmered with milk and warming spices." },
{ id: 79, name: "Iced Coffee", category: "Drinks", cuisine: "Continental", ingredients: ["coffee", "milk", "ice", "sugar"], calories: 130, minutes: 5, description: "Cold coffee served over ice." },
{ id: 80, name: "Banana Smoothie", category: "Drinks", cuisine: "Continental", ingredients: ["banana", "milk", "yogurt", "honey"], calories: 190, minutes: 5, description: "A creamy banana breakfast smoothie." },
{ id: 81, name: "Strawberry Smoothie", category: "Drinks", cuisine: "Continental", ingredients: ["strawberries", "milk", "yogurt", "honey"], calories: 170, minutes: 5, description: "A fruity pink smoothie." },
{ id: 82, name: "Watermelon Cooler", category: "Drinks", cuisine: "Global", ingredients: ["watermelon", "lime", "mint", "ice"], calories: 70, minutes: 5, description: "Fresh watermelon blended with lime and mint." },
{ id: 83, name: "Lemon Mint Water", category: "Drinks", cuisine: "Global", ingredients: ["lemon", "mint", "water", "ice"], calories: 10, minutes: 5, description: "A refreshing infused water." },
{ id: 84, name: "Hot Chocolate", category: "Drinks", cuisine: "Continental", ingredients: ["milk", "cocoa powder", "sugar", "chocolate"], calories: 220, minutes: 8, description: "Rich cocoa warmed with milk." },
{ id: 85, name: "Matcha Latte", category: "Drinks", cuisine: "Japanese", ingredients: ["matcha", "milk", "honey", "water"], calories: 150, minutes: 5, description: "Earthy matcha whisked into warm milk." },
{ id: 86, name: "Ginger Lemon Tea", category: "Drinks", cuisine: "Global", ingredients: ["ginger", "lemon", "honey", "water"], calories: 45, minutes: 8, description: "A soothing ginger and lemon infusion." },
{ id: 87, name: "Cucumber Cooler", category: "Drinks", cuisine: "Global", ingredients: ["cucumber", "lime", "mint", "water"], calories: 35, minutes: 5, description: "A light cucumber drink with fresh herbs." },
{ id: 88, name: "Pineapple Juice", category: "Drinks", cuisine: "Global", ingredients: ["pineapple", "water", "lime"], calories: 110, minutes: 5, description: "Sweet pineapple juice with a citrus finish." },
{ id: 89, name: "Orange Carrot Juice", category: "Drinks", cuisine: "Global", ingredients: ["orange", "carrot", "ginger"], calories: 125, minutes: 7, description: "A colourful fruit and vegetable juice." },
{ id: 90, name: "Berry Yogurt Shake", category: "Drinks", cuisine: "Continental", ingredients: ["berries", "yogurt", "milk", "honey"], calories: 205, minutes: 5, description: "A tangy mixed-berry shake." },
{ id: 91, name: "Coconut Water Refresher", category: "Drinks", cuisine: "Global", ingredients: ["coconut water", "lime", "mint"], calories: 55, minutes: 3, description: "Naturally sweet coconut water with lime." },
{ id: 92, name: "Cold Brew Coffee", category: "Drinks", cuisine: "Continental", ingredients: ["coffee", "water", "ice", "milk"], calories: 15, minutes: 5, description: "Smooth coffee served chilled." },
{ id: 93, name: "Peach Iced Tea", category: "Drinks", cuisine: "Global", ingredients: ["tea", "peach", "lemon", "honey", "ice"], calories: 90, minutes: 10, description: "Lightly sweet tea with peach." },
{ id: 94, name: "Rose Milk", category: "Drinks", cuisine: "Indian", ingredients: ["milk", "rose syrup", "ice"], calories: 180, minutes: 5, description: "Chilled milk flavoured with rose." },
{ id: 95, name: "Virgin Mojito", category: "Drinks", cuisine: "Global", ingredients: ["lime", "mint", "soda water", "sugar"], calories: 85, minutes: 5, description: "A minty lime soda without alcohol." }
,
{ id: 96, name: 'Vegetable Pulao', category: 'Lunch', cuisine: 'Indian', ingredients: ['basmati rice', 'peas', 'carrot', 'beans', 'onion'], calories: 390, minutes: 35, description: 'Fragrant one-pot rice with vegetables and whole spices.' },
{ id: 97, name: 'Chana Masala', category: 'Lunch', cuisine: 'Indian', ingredients: ['chickpeas', 'tomato', 'onion', 'ginger', 'garam masala'], calories: 340, minutes: 30, description: 'Chickpeas simmered in a tangy tomato and spice gravy.' },
{ id: 98, name: 'Palak Paneer', category: 'Dinner', cuisine: 'Indian', ingredients: ['spinach', 'paneer', 'onion', 'tomato', 'cream'], calories: 420, minutes: 35, description: 'Paneer cubes folded into a gently spiced spinach sauce.' },
{ id: 99, name: 'Rajma Chawal', category: 'Lunch', cuisine: 'Indian', ingredients: ['kidney beans', 'rice', 'tomato', 'onion', 'ginger'], calories: 460, minutes: 45, description: 'Red kidney bean curry served with steamed rice.' },
{ id: 100, name: 'Margherita Pizza', category: 'Dinner', cuisine: 'Italian', ingredients: ['pizza dough', 'tomato', 'mozzarella', 'basil'], calories: 510, minutes: 30, description: 'A simple tomato, mozzarella and basil pizza.' },
{ id: 101, name: 'Pasta Primavera', category: 'Dinner', cuisine: 'Italian', ingredients: ['pasta', 'zucchini', 'bell pepper', 'tomato', 'parmesan'], calories: 430, minutes: 25, description: 'Pasta tossed with colourful seasonal vegetables.' },
{ id: 102, name: 'Caprese Salad', category: 'Snack', cuisine: 'Italian', ingredients: ['tomato', 'mozzarella', 'basil', 'olive oil'], calories: 260, minutes: 10, description: 'Fresh tomato and mozzarella layered with basil.' },
{ id: 103, name: 'Vegetable Fried Rice', category: 'Lunch', cuisine: 'Chinese', ingredients: ['rice', 'carrot', 'peas', 'spring onion', 'soy sauce'], calories: 380, minutes: 20, description: 'Quick wok-fried rice with vegetables and soy.' },
{ id: 104, name: 'Tofu Stir Fry', category: 'Dinner', cuisine: 'Chinese', ingredients: ['tofu', 'broccoli', 'bell pepper', 'soy sauce', 'ginger'], calories: 350, minutes: 20, description: 'Crisp vegetables and tofu tossed in a ginger-soy sauce.' },
{ id: 105, name: 'Chicken Lettuce Wraps', category: 'Dinner', cuisine: 'Chinese', ingredients: ['chicken', 'lettuce', 'carrot', 'soy sauce', 'garlic'], calories: 310, minutes: 25, description: 'Savoury chicken filling served in crisp lettuce cups.' },
{ id: 106, name: 'Black Bean Tacos', category: 'Dinner', cuisine: 'Mexican', ingredients: ['black beans', 'tortillas', 'tomato', 'avocado', 'lime'], calories: 390, minutes: 20, description: 'Warm tortillas filled with seasoned beans and fresh toppings.' },
{ id: 107, name: 'Guacamole', category: 'Snack', cuisine: 'Mexican', ingredients: ['avocado', 'lime', 'onion', 'tomato', 'cilantro'], calories: 190, minutes: 10, description: 'Mashed avocado with lime, onion and fresh herbs.' },
{ id: 108, name: 'Greek Salad', category: 'Lunch', cuisine: 'Mediterranean', ingredients: ['cucumber', 'tomato', 'olives', 'feta', 'olive oil'], calories: 290, minutes: 15, description: 'A crisp salad with cucumber, tomato, olives and feta.' },
{ id: 109, name: 'Hummus Bowl', category: 'Lunch', cuisine: 'Mediterranean', ingredients: ['chickpeas', 'tahini', 'lemon', 'cucumber', 'pita'], calories: 360, minutes: 15, description: 'Creamy hummus served with fresh vegetables and pita.' },
{ id: 110, name: 'Shakshuka', category: 'Breakfast', cuisine: 'Mediterranean', ingredients: ['eggs', 'tomato', 'bell pepper', 'onion', 'paprika'], calories: 320, minutes: 25, description: 'Eggs gently poached in a spiced tomato and pepper sauce.' },
{ id: 111, name: 'Teriyaki Tofu Bowl', category: 'Dinner', cuisine: 'Japanese', ingredients: ['tofu', 'rice', 'soy sauce', 'honey', 'broccoli'], calories: 440, minutes: 30, description: 'Rice bowl with glazed tofu and steamed broccoli.' },
{ id: 112, name: 'Vegetable Sushi Bowl', category: 'Lunch', cuisine: 'Japanese', ingredients: ['rice', 'cucumber', 'avocado', 'carrot', 'nori'], calories: 370, minutes: 25, description: 'A sushi-inspired bowl with seasoned rice and vegetables.' },
{ id: 113, name: 'Thai Peanut Noodles', category: 'Dinner', cuisine: 'Thai', ingredients: ['noodles', 'peanut butter', 'soy sauce', 'lime', 'carrot'], calories: 470, minutes: 20, description: 'Noodles coated in a creamy peanut-lime dressing.' },
{ id: 114, name: 'Tom Kha Style Soup', category: 'Dinner', cuisine: 'Thai', ingredients: ['coconut milk', 'mushrooms', 'ginger', 'lime', 'vegetable stock'], calories: 280, minutes: 25, description: 'A fragrant coconut soup with mushrooms and lime.' },
{ id: 115, name: 'Berry Overnight Oats', category: 'Breakfast', cuisine: 'Continental', ingredients: ['oats', 'milk', 'berries', 'chia seeds', 'yogurt'], calories: 350, minutes: 5, description: 'Creamy oats chilled overnight with berries and chia.' },

{ id: 116, name: "Chocolate Banana Bites", category: "Dessert", cuisine: "Continental", ingredients: ["banana", "dark chocolate", "coconut"], calories: 180, minutes: 15, description: "Frozen banana pieces dipped in dark chocolate." },
{ id: 117, name: "Mango Yogurt Parfait", category: "Dessert", cuisine: "Global", ingredients: ["mango", "yogurt", "granola", "honey"], calories: 240, minutes: 10, description: "Layers of mango, creamy yogurt and crunchy granola." },
{ id: 118, name: "Apple Cinnamon Oats Crumble", category: "Dessert", cuisine: "Continental", ingredients: ["apple", "oats", "cinnamon", "honey", "butter"], calories: 290, minutes: 25, description: "Warm cinnamon apples topped with a crisp oat crumble." },
];

// Expanded database: 98 food recipes and 20 drinks (118 total).
