require("../db/db_connection")
const mongoose=require("mongoose")
const personal_care=require("../models/product_model").personalcare

const products=[
    new personal_care({
        imagePath: "/images/personalcare/burstbees.jpg",
        title: "Burt's Bees Natural Moisturizing Lip Balm",
        price: 9.57,
        category:"personalcare",
        product_description: "LIP CARE: Bursting with all natural flavors, refresh and nourish your lips with Burt's Bees Moisturizing Lip Balm in four naturally nourishing flavors: Pink Grapefruit, Mango, Coconut & Pear, and Pomegranate."
    }),
    new personal_care({
        imagePath: "/images/personalcare/cerave_cream.jpg",
        title: "CeraVe Moisturizing Cream ",
        price: 16.57,
        category:"personalcare",
        product_description: "[ HYALURONIC ACID MOISTURIZER ] With niacinamide, ceramides and MVE technology for 24 hour hydration. Rich, velvety texture that leaves skin feeling smooth, it is absorbed quickly for softened skin without greasy, sticky, feel"
    }),

    new personal_care({
        imagePath: "/images/personalcare/cerave_lotion.jpg",
        title: "CeraVe Moisturizing Cream ",
        price: 17.78,
        category:"personalcare",
        product_description: "[ DAILY MOISTURIZING LOTION ] Smooth, light-weight texture that is absorbed quickly, leaving skin feeling smooth and hydrated, never greasy."
    }),

    new personal_care({
        imagePath: "/images/personalcare/cetaphil_skin_cleanser.jpg",
        title: "Cetaphil Gentle Skin Cleanser ",
        price: 11.98,
        category:"personalcare",
        product_description: "CETAPHIL GENTLE SKIN CLEANSER: For daily use to gently clean, hydrate and soothe sensitive skin."
    }),

    new personal_care({
        imagePath: "/images/personalcare/dove_deep_moisture.jpg",
        title: "Dove Body Wash  ",
        price: 8.23,
        category:"personalcare",
        product_description: "MILD AND PH-BALANCED: Dove body wash includes Moisture Renew Blend—a combination of skin-natural nourishers and plant-based moisturizers that absorb deeply into the top layers of skin."
    }),
 
    new personal_care({
        imagePath: "/images/personalcare/dove_soap.jpg",
        title: "Dove Beauty Bar  ",
        price: 15.28,
        category:"personalcare",
        product_description: "GENTLE ON SENSITIVE SKIN: Effectively wash away bacteria and nourish your skin with Dove Sensitive Skin Beauty Bar. With its hypoallergenic formula, it gently cleanses for softer skin."
    }),

    new personal_care({
        imagePath: "/images/personalcare/makeup_remover.jpg",
        title: "Neutrogena Makeup Remover Wipes",
        price: 8.45,
        category:"personalcare",
        product_description: "Twin pack of 25 count soft, pre-moistened Neutrogena Makeup Remover Cleansing Face Wipes to remove makeup and effectively cleanse skin in one easy step."
    }),

    new personal_care({
        imagePath: "/images/personalcare/miracle_patch.jpg",
        title: "Rael Acne Pimple Healing Patch ",
        price: 15.99,
        category:"personalcare",
        product_description: "MADE WITH HIGH-GRADE HYDROCOLLOID: Adhere directly to the skin and extract all the pus and impurities straight from the source."
    }),

    new personal_care({
        imagePath: "/images/personalcare/neutrogena_water_gel.jpg",
        title: "Neutrogena Hydro Boost Water Gel ",
        price: 15.33,
        category:"personalcare",
        product_description: "1.7-fluid ounce jar of Neutrogena Hydro Boost hydrating water-gel face moisturizer with hyaluronic acid to hydrate dry skin."
    }),

    new personal_care({
        imagePath: "/images/personalcare/pronamel.jpg",
        title: "Sensodyne Pronamel Gentle Teeth Whitening ",
        price: 19.33,
        category:"personalcare",
        product_description: "Three 4 oz tubes of Alpine Breeze flavored Sensodyne Pronamel Gentle Teeth Whitening Enamel Toothpaste for Sensitive Teeth, to Reharden and Strengthen Enamel."
    }),

    new personal_care({
        imagePath: "/images/personalcare/tree_hut.jpg",
        title: "Tree Hut Shea Sugar Scrub ",
        price: 5.33,
        category:"personalcare",
        product_description: "100% PURE NATURAL SHEA BUTTER - Premium deep moisturizer that wonderfully softens and smooths dry cracked skin."
    }),
  
    new personal_care({
        imagePath: "/images/personalcare/truskin_serum.jpg",
        title: "TruSkin Vitamin C Serum for Face  ",
        price: 20.33,
        category:"personalcare",
        product_description: "Advanced Antioxidant Serum - An indispensable nutrient for collagen production, vitamin C synergistically blends with Botanical Hyaluronic Acid and Vitamin E in this advanced formula designed to target the most common signs of aging including brightness, firmness, fine lines, wrinkles, dark spots & sun spots."
    }),
]


for (var i=0;i<products.length;i+=1){
    products[i].save()
}

