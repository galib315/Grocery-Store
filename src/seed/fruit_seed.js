const mongoose = require("mongoose")
require("../db/db_connection")
const fruits = require("../models/product_model").fruits


const products = [
    new fruits({
        imagePath: "/images/fruits/avocados.jpeg",
        title: "Medium Hass Avocados",
        price: 2.47,
        price_description: "4-6 Count Bag",
        product_description: "Medium Hass Avocados aren't just great-tasting fresh produce items, but they are a nutrient-dense food enjoyed around the world. ",
        category:"fruits"

    }),
    new fruits({
        imagePath: "/images/fruits/bananas.jpeg",
        title: "Bananas",
        price: 0.19,
        category:"fruits",
        price_description: "0.19 each or 47.0/lb",
        product_description: "Each banana is a versatile fruit that's packed with potassium and dietary fiber to help maintain a balanced and nutritional diet."
    }),

    new fruits({
        imagePath: "/images/fruits/black_plums.jpeg",
        title: "Black Plums",
        category:"fruits",
        price: 0.19,
        price_description: "0.47 each or $1.58/lb",
        product_description: "It provides fiber and essential vitamins and minerals. Black plums are no exception. They contain vitamin A and other vitamins and minerals."
    }),

    new fruits({
        imagePath: "/images/fruits/blackberries.jpeg",
        title: "Fresh Blackberries, 6 oz",
        category:"fruits",
        price: 2.28,
        price_description: "38.0/oz",
        product_description: "Use them make a sweet, crunchy blackberry cobbler, bake them into delicious blackberry scones, or pan roast chicken thighs with blackberries and thyme, or create a mouthwatering blackberry jam for biscuits and toast."
    }),

    new fruits({
        imagePath: "/images/fruits/cantaloupe.jpeg",
        title: "Cantaloupe",
        category:"fruits",
        price: 1.88,
        price_description: "each $1.88",
        product_description: "Treat yourself to the refreshing flavor of a fresh Cantaloupe. Enjoy this tasty melon on its own as a healthy snack or incorporate it into a variety of delicious recipes. "
    }),

    new fruits({
        imagePath: "/images/fruits/clementines.jpeg",
        title: "Clementines, 3lb bag",
        category:"fruits",
        price: 3.44,
        price_description: "$1.15/lb",
        product_description: "Mandarins are the coveted leader of the citrus category—high in Vitamin C, and an immunity boosting superfood. "
    }),

    new fruits({
        imagePath: "/images/fruits/fresh_strawberries.jpeg",
        title: "Fresh Strawberries, 1 lb",
        category:"fruits",
        price: 2.88,
        price_description: "18.0/oz",
        product_description: "The sweet, juicy flavor of Fresh Strawberries make them a refreshing and delicious treat. Enjoy them for breakfast, lunch, dinner, or dessert. "
    }),

    new fruits({
        imagePath: "/images/fruits/fuji_apples.jpeg",
        title: "Fuji Apples, each",
        category:"fruits",
        price: 0.74,
        price_description: "$ 1.24/lb",
        product_description: "Treat your family to the healthy taste of Fuji Apples. Low in calories, these crisp and crunchy apples can be a satisfying afternoon snack, or you can use them in a variety of recipes. "
    }),

    new fruits({
        imagePath: "/images/fruits/green_seedless_grapes.jpeg",
        title: "Green Seedless Grapes, 2 lb",
        category:"fruits",
        price: 2.63,
        price_description: "$ 1.17/lb",
        product_description: "Green Seedless Grapes are the perfect sweet snack that your whole family will enjoy. The grapes are crisp and sweet and make an excellent addition to your breakfast, lunch, dinner or snack.  "
    }),

    new fruits({
        imagePath: "/images/fruits/kiwis.jpeg",
        title: "Kiwi, 1 Each",
        category:"fruits",
        price: 0.38,
        price_description: "$0.38/piece",
        product_description: "They are packed with Vitamin C, fiber and antioxidants. They’re also fat-free and have a low glycemic index."
    }),

    new fruits({
        imagePath: "/images/fruits/lemon_juice.jpeg",
        title: "Concord Foods Lemon Juice, 4.5 oz",
        category:"fruits",
        price: 0.88,
        price_description: "19.6 cents/LB",
        product_description: "Concord Foods Lemon Juice will add zest and flavor to your favorite recipes. Use this lemon juice in sweet treats like lemon thumbprint cookies, lemon snowball cookies, or cheesecake lemon bars. You can also use it to add flavor to savory foods like lemon chicken or lemon spinach dip."
    }),

    new fruits({
        imagePath: "/images/fruits/lemons.jpeg",
        title: "Lemons, each",
        category:"fruits",
        price: 0.48,
        price_description: "$0.48 per piece",
        product_description: "Stock up on several of these juicy Lemons to enjoy with each day while meal planning. Squeeze a few to make delicious homemade lemonade and provide a healthy dose of vitamin C to your diet."
    }),

    new fruits({
        imagePath: "/images/fruits/mango_spears.jpeg",
        title: "Freshness Guaranteed Mango Spears 16 oz",
        category:"fruits",
        price: 4.68,
        price_description: "29.3 cents/OZ",
        product_description: "Snack on your favorite tropical fruit the quick and convenient way with this pack of Mango Spears. This package contains 16 oz of fresh mangoes that have been pre-sliced for your instant enjoyment."
    }),

    new fruits({
        imagePath: "/images/fruits/pineapple_chunks.jpeg",
        title: "Freshness Guaranteed Pineapple Chunks, 16 oz",
        category:"fruits",
        price: 3.88,
        price_description: "24.8 cents/OZ",
        product_description: "These pre-cut chunks are great for breakfast, lunch, dessert, or when you want a snack. Pineapple is a good source of vitamin C, vitamin A and vitamin B6 making them an excellent healthy treat."
    }),

    new fruits({
        imagePath: "/images/fruits/pineapple.jpeg",
        title: "Pineapple",
        category:"fruits",
        price: 1.88,
        price_description: "24.8 cents/OZ",
        product_description: "Pineapple is a good source of vitamin C, vitamin A and vitamin B6 making them an excellent healthy treat."
    }),

    new fruits({
        imagePath: "/images/fruits/plantains.jpeg",
        title: "Plantains",
        price: 0.50,
        category:"fruits",
        price_description: "0.50 per piece",
        product_description: "Bring the taste of the islands to any meal with our Fresh Plantains. Plantains are sweet like a banana, but without the banana flavor. They can be eaten raw but are generally used in cooking and are delicious when fried or caramelized."
    }),

    new fruits({
        imagePath: "/images/fruits/raspberries.jpeg",
        title: "Fresh Raspberries, 6 oz",
        price: 2.18,
        category:"fruits",
        price_description: "36.3/oz",
        product_description: "Enjoy them for breakfast, lunch, dinner, or dessert. Use them as topping for decadent chocolate cake, bake them in mouthwatering scones, or create a tangy sauce and serve it over a grilled salmon fillet, or puree them for a sweet jam."
    }),

    new fruits({
        imagePath: "/images/fruits/seedless_grapes.jpeg",
        title: "Fresh Red Seedless Grapes, per lb",
        price: 2.99,
        category:"fruits",
        price_description: "$1.33/lb",
        product_description: "Red Seedless Grapes are the perfect sweet snack that your whole family will enjoy. The grapes are crisp and sweet and make an excellent addition to your breakfast, lunch, dinner or snack."
    }),

    new fruits({
        imagePath: "/images/fruits/watermelon.jpeg",
        title: "Personal Watermelon, each",
        price: 3.48,
        category:"fruits",
        price_description: "$3.48 per piece",
        product_description: "Mini Watermelon, 1 Each.May contain occasional seeds"
    }),

    new fruits({
        imagePath: "/images/fruits/yellow_nectarines.jpeg",
        title: "Yellow Nectarines, each",
        price: 1.48,
        category:"fruits",
        price_description: "$1.48/lb",
        product_description: "Fresh Yello Nectarines"
    })

]

for (var i = 0; i < products.length; i += 1) {
    products[i].save()
}
