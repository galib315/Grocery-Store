const mongoose = require("mongoose")
require("../db/db_connection")

const vegetables = require("../models/vegetables")

const products = [
    new vegetables({
        imagePath: "asparaguch_bunch.jpeg",
        title: "Asparagus, Bunch",
        price: 2.48,
        price_description: "each 2.48/LB",
        product_description: "This asparagus is loaded with nutrients and has a great fresh taste. This versatile vegetable can be prepared in a myriad of different ways."
    }),
    new vegetables({
        imagePath: "baby_cut_carrots.jpeg",
        title: "Bolthouse Farms Peeled Baby Cut Carrots, 1 lb Bag",
        price: 0.98,
        price_description: "98.0cents/LB",
        product_description: "Bolthouse Farms baby carrots have a crisp texture. These Bolthouse Farms baby carrots don't have any preservatives. Enjoy them at any time of the day."
    }),
    new vegetables({
        imagePath: "baby_yellow_potato.jpeg",
        title: "Baby Yellow Potatoes, 1.5 lb Bag",
        price: 3.47,
        price_description: "14.5cents/OZ",
        product_description: "Melissa's Baby Yellow Potatoes are hand selected for excellent quality. Firm, well-shaped, and smooth, these potatoes can be cooked in almost any way imaginable. They have a wonderful, buttery texture and flavor when baked, roasted, boiled, steamed, sauteed, or mashed."
    }),
    new vegetables({
        imagePath: "broccoli.jpeg",
        title: "Broccoli Crowns",
        price: 1.11,
        price_description: "each 1.48/lb",
        product_description: "Broccoli crowns are the premium cut of broccoli, trimmed just under the broccoli head. Healthy & Delicious!"
    }),
    new vegetables({
        imagePath: "cauliflower.jpeg",
        title: "Cauliflower",
        price: 1.98,
        price_description: "each $1.98",
        product_description: "Cauliflower (1 each) is an outstanding addition to a menu. Often used as a carb substitute, it can also make a tasty starter or main entree item."
    }),
    new vegetables({
        imagePath: "cucumber.jpeg",
        title: "Cucumber",
        price: 0.50,
        price_description: "each $0.50",
        product_description: " Packed with nutritional benefits such as being naturally low in calories, carbohydrates, sodium, fat, and cholesterol, cucumbers also provide potassium, fiber, and vitamin C and clock in at a cool 16 calories per cup."
    }),
    new vegetables({
        imagePath: "eggplant.jpeg",
        title: "Eggplant",
        price: 1.23,
        price_description: "each 98.0/lb",
        product_description: "Eggplants are incredibly versatile and can be used to make a myriad of different recipes. Try them coated in breadcrumbs and fried or a comforting side, or for a healthier option you can stuff them and roast them in the oven."
    }),
    new vegetables({
        imagePath: "fresh_celery.jpeg",
        title: "Fresh Celery",
        price: 0.88,
        price_description: "each 0.88",
        product_description: " Celery is a low-calorie vegetable that consists mostly of water but is packed full of antioxidants and fiber."
    }),
    new vegetables({
        imagePath: "fresh_corn_cub.jpeg",
        title: "Fresh Corn on the Cob",
        price: 0.38,
        price_description: "0.38/piece",
        product_description: "There's nothing like freshly picked corn straight from the fields, cooked until the kernels are tender and bursting with sweet juice! This summer staple is perfect for casual dinners, BBQs, picnics, and camping trips."
    }),
    new vegetables({
        imagePath: "fresh_ginger_root.jpeg",
        title: "Fresh Ginger Root",
        price: 1.98,
        price_description: "$1.98/lb",
        product_description: "Fresh Ginger Root has a light brown, textured skin and white to yellow flesh. Its peppery, pungent, zesty flavor is a great way to bring acidity and just a touch of sweetness to juices, teas, stir-fries, and more."
    }),
    new vegetables({
        imagePath: "garlic.jpeg",
        title: "Garlic",
        price: 3.48,
        price_description: "$3.48/lb",
        product_description: "Garlic's signature flavors become caramelized and sweeter when cooked, making it a perfect accompaniment to many dishes such as pasta, shrimp, chicken, stews, and more."
    }),
    new vegetables({
        imagePath: "green_beans.jpeg",
        title: "Green Beans",
        price: 1.68,
        price_description: "$1.68/lb",
        product_description: "These beans are an excellent source of vitamin A and vitamin C. Serve as is or add your favorite spices for additional flavor."
    }),
    new vegetables({
        imagePath: "green_bell_pepper.jpeg",
        title: "Green Bell Pepper",
        price: 0.58,
        price_description: "$0.58 per piece",
        product_description: "This vegetable contains essential vitamins such as A and C, and minerals including calcium and magnesium. Green bell pepper, also known as green capsicum, has a crisp flavor that enhances a variety of recipes."
    }),
    new vegetables({
        imagePath: "green_cabbage.png",
        title: "Green Cabbage",
        price: 1.74,
        price_description: "$58.0 cent/LB",
        product_description: "Green cabbage is low in calories and high in fiber and antioxidants making it a great part of any healthy diet. Best of all, this cabbage can be used a myriad of different recipes and cuisines."
    }),
    new vegetables({
        imagePath: "green_onion_bunch.jpeg",
        title: "Green Onion, bunch",
        price: 0.50,
        price_description: "$ 0.50 /bunch",
        product_description: "Green Onions are a versatile addition to your kitchen pantry. They have a fresh from garden taste that makes them perfect for a variety of mouthwatering recipes."
    }),

    new vegetables({
        imagePath: "iceberg_lettuce.jpeg",
        title: "Iceberg Lettuce",
        price: 1.53,
        price_description: "$ 1.53 each",
        product_description: "This lettuce is loaded with nutrients, has a mild sweetness, and is highly crisp for a perfect bite every time. You can use it to create your very own personalized salad tossed with your favorite vegetables, protein, croutons, nuts and dressing."
    }),

    new vegetables({
        imagePath: "marketside_chicken_ceasar_salad_bowl.jpeg",
        title: "Marketside Chicken Caesar Salad Bowl 6.25 oz",
        price: 2.98,
        price_description: "47.7/OZ",
        product_description: "Marketside Chicken Caesar Salad Bowl offers you a complete and delicious meal in a nifty, ready to go, sealed bowl. Complete with crisp romaine lettuce, white meat chicken, parmesan style cheese and Caesar dressing, this healthy salad is sure to fill your craving for something fresh."
    }),

    new vegetables({
        imagePath: "marketside_organic_baby_spinach.jpeg",
        title: "Marketside Organic Baby Spinach, 5 oz",
        price: 2.56,
        price_description: "51.2cents/OZ",
        product_description: "Marketside Organic Baby Spinach has a smooth, tender texture and great fresh taste that is loaded with nutrients. This spinach is packed fresh, washed and ready to eat for your convenience."
    }),

    new vegetables({
        imagePath: "marketside_southwest_chooped_salad.jpeg",
        title: "Marketside Southwest Chopped Salad Kit, 10.3 oz",
        price: 2.98,
        price_description: "23.1/oz",
        product_description: "Marketside Southwest Chopped Salad Kit comes loaded with a refreshing mix of green cabbage, green leaf lettuce, kale, red cabbage, carrots, green onions, tortilla strips, cheddar cheese and chipotle dressing."
    }),

    new vegetables({
        imagePath: "marketside_sugar_snap_peas.jpeg",
        title: "Marketside Sugar Snap Peas, 8oz",
        price: 2.58,
        price_description: "32.3/oz",
        product_description: "Marketside Sugar Snap Peas 8oz."
    }),

    new vegetables({
        imagePath: "mixed_bell_pepper.jpeg",
        title: "Mixed Bell Peppers (Selection May Vary), 3 Count",
        price: 3.28,
        price_description: "3.28 /3 piece",
        product_description: " These Bell Peppers are a type of sweet pepper with many health benefits and a high amount of Vitamins A and C. Best of all this versatile pepper can be used both fresh and cooked in a myriad of recipes."
    }),

    new vegetables({
        imagePath: "red_onion.jpeg",
        title: "Red Onions",
        price: 0.78,
        price_description: "98.0cents/LB",
        product_description: "These onions are perfect for adding to your favorite recipes. Add them to your favorite pasta sauces; use them to top pizza; enhance the flavors of your soups, stews, and gumbo, incorporate them into meatloaf; or make delicious omelets or hearty casseroles."
    }),


    new vegetables({
        imagePath: "roma_tomato.jpeg",
        title: "Roma Tomatoes",
        price: 0.98,
        price_description: "98.0/lb",
        product_description: "Roma tomatoes are an ideal ingredient for whipping up a variety of wonderful dishes. You can use them to create a zesty tomato sauce for stirring into a homemade pasta dish, crush them up to make a delightful Roma tomato bruschetta, or simply enjoy them on their own as a nutritious snack or as a party platter option for dipping in your favorite vegetable dipping sauce."
    }),

    new vegetables({
        imagePath: "russet_potato.jpeg",
        title: "Simply Perfect Russet Potatoes, 5lb bag",
        price: 1.97,
        price_description: "39.4/lb",
        product_description: "Use russet potatoes to create a variety of cooked and baked dishes- from creamy, flavorful mashed potatoes, to fluffy, filling baked potatoes topped with cheese, bacon, and sour cream, or cheesy, succulent au gratin potatoes."
    }),

    new vegetables({
        imagePath: "serrano_peppers.jpeg",
        title: "Serrano Peppers, approx. 8-12 per 0.25 lb",
        price: 0.27,
        price_description: "$1.4/lb",
        product_description: "Naturally low in calories, fat, and cholesterol, this vegetable is a great source of vitamins C, B6, and A, as well as iron and magnesium. Serrano peppers have a bright and biting flavor that enhances a variety of recipes."
    }),

    new vegetables({
        imagePath: "spinach.jpeg",
        title: "Marketside Fresh Spinach, 10 oz",
        price: 1.37,
        price_description: "$13 cents/OZ",
        product_description: "Use it to create your very own personalized salad tossed with your favorite vegetables, protein, nuts and dressing. Use it as a topping on sandwiches and pizzas, or simply enjoy it as a healthy side."
    }),

    new vegetables({
        imagePath: "sweet_potatoes.jpeg",
        title: "Sweet Potatoes",
        price: 0.54,
        price_description: "67.0/lb",
        product_description: "These versatile vegetables can be used to make savory sides or sweet treats. Try them roasted or baked for a tasty addition to any dish. You could also use them to make seasoned sweet potato fries or a flavorful hummus dip for your next party."
    }),


    new vegetables({
        imagePath: "tomatoes.jpeg",
        title: "Tomatoes on the Vine, avg 1.4 lb cluster",
        price: 1.48,
        price_description: "each 1.48/lb",
        product_description: "Tomatoes are truly a ruler of the kitchen, and our Tomatoes on the Vine double down the flavor, taste, and color you've come to count on. Each cluster has four to five tomatoes with high sugar content, bright red color and medium sizing."
    }),

    new vegetables({
        imagePath: "white_mushroom.jpeg",
        title: "Fresh White Mushrooms, 8 oz",
        price: 1.38,
        price_description: "17.3/oz",
        product_description: "This versatile ingredient is perfect for a variety of dishes, whether its for breakfast, lunch, or dinner. Mince some up and put them in your omelet with peppers and ham for a filling breakfast."
    }),

    new vegetables({
        imagePath: "whole_carrot.jpeg",
        title: "Whole Carrots, 1lb bag",
        price: 0.82,
        price_description: "82.0 cents/LB",
        product_description: " This 1 lb. Bag of Whole Carrots can make a versatile addition to various meals. They have a crisp crunch and a bold taste. These California carrots are easy to cut into pieces for adding to a stew, pot roast or meat pie."
    }),

    new vegetables({
        imagePath: "yellow_onion.jpeg",
        title: "Yellow Onions 3 lb Bag",
        price: 1.94,
        price_description: "64.7cents/LB",
        product_description: "They can be added to all of your favorite foods including hamburgers, stir-fries, soups, and pizza and used to make onion rings and blooming onions as well."
    }),


    new vegetables({
        imagePath: "yellow_squash.jpeg",
        title: "Yellow Squash, 1 Each",
        price: 1.94,
        price_description: "$1.38/lb",
        product_description: "These versatile vegetables can be used to make savory sides or sweet treats. Try them dipped in batter and fried for a comforting side or, for a healthier option, you can make a filling squash and chicken chowder, or roast them in the oven stuffed with ground turkey."
    }),


    new vegetables({
        imagePath: "zucchini.jpeg",
        title: "Zucchini, 1 Each",
        price: 0.76,
        price_description: "$1.38/lb",
        product_description: "This Zucchini, Each provides a healthy dose of vitamins to add to your diet. Ideal for many types of cuisines, it can be enjoyed year-round in many recipes. It can be used as a simple side dish, sauteed in oil, herbs and spices."
    }),

]

var done = 0
for (var i = 0; i < products.length; i += 1) {
    products[i].save()
}
