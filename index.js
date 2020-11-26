const express = require('express');
const path = require('path');
const hbs = require('hbs');
const products = require("./src/models/product_model").product;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var Cart = require("./src/models/cart");
const session = require('express-session');
const flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
const methodOverride = require("method-override")

const mongoose = require("mongoose");
const { product } = require('./src/models/product_model');
require("./src/db/db_connection")


const app = express();
const port = process.env.PORT || 3000;

// for customizing directories
const publicDirectoryPath = path.join(__dirname, "/public");
const viewsDirectory = path.join(__dirname, "src//views");
const partialsPath = path.join(__dirname, "src/views/partials");


//setting the properties for express
app.set('view engine', '.hbs');
app.set('views', viewsDirectory);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 60 * 60 * 1000 } //persist the session for 60 minutes (converted into milliseconds)
}));
app.use(flash());

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use(methodOverride("_method"))


//root route - returns all products
app.get("/", async (req, res) => {
    try {
        const itemLimit = 15;   //no. of items to display on each page
        const { page = 1, limit = itemLimit } = req.query;
        var totalPages = 1;

        //get the total no. of all items
        await products.countDocuments({}, function (error, counts) {
            totalPages = Math.ceil(counts / itemLimit);
        });

        await products.find({}).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {
            var productChunks = [];
            var chunkSize = 3;

            for (var i = 0; i < result.length; i += chunkSize) {
                productChunks.push(result.slice(i, i + chunkSize));
            }

            res.render("index", { product: productChunks, pagination: totalPages });

        })

    }
    catch (error) {
        res.status(500).send(error);
    }

});

//route to add products to the cart (redirects to the home page)
app.get('/add-to-cart/:id/:qty', async (req, res) => {
    var productId = req.params.id;
    var qty = parseInt(req.params.qty);
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});

    await products.findOne({ _id: productId }, function (err, product) {
        cart.add(product, productId, qty);
        req.session.cart = cart;
        res.redirect('/');
    });
});

//route to update product quantity from the shopping cart page (stays on the current page)
app.get('/add-to-cart/:id/:qty/no-redirect', async (req, res) => {
    var productId = req.params.id;
    var qty = parseInt(req.params.qty);
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});

    await products.findOne({ _id: productId }, function (err, product) {

        cart.add(product, productId, qty);
        req.session.cart = cart;
        res.redirect('/cart');
    });
});

//route to render the shopping cart page
app.get('/cart', async (req, res) => {
    if (!req.session.cart) {
        return res.render('cart', { products: null });
    }
    var cart = new Cart(req.session.cart.items);
    res.render('cart', { products: cart.lookupItems(), totalPrice: parseFloat(cart.totalPrice).toFixed(2) });
});

//route to render the checkout page
app.get('/checkout', function (req, res) {
    if (!req.session.cart) {
        return res.render('cart', { products: null });
    }

    res.render('checkout');
});

//route to return products from chosen category
app.get("/:category", async (req, res) => {
    try {
        const itemLimit = 15;   //no. of items to display on each page
        const { page = 1, limit = itemLimit } = req.query;
        var totalPages = 1;

        //get the total no. of items in the chosen category
        await products.countDocuments({ category: req.params.category }, function (error, counts) {
            totalPages = Math.ceil(counts / itemLimit);
        });

        await products.find({ category: req.params.category }).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {
            var productChunks = [];
            var chunkSize = 3;

            for (var i = 0; i < result.length; i += chunkSize) {
                productChunks.push(result.slice(i, i + chunkSize));
            }

            res.render("index", { product: productChunks, pagination: totalPages });

        })

    }
    catch (error) {
        res.status(500).send(error);
    }

});

app.get("/admin/add", (req, res) => {

    res.render("admin_add_product")
})

app.get("/products/:id/show", (req, res) => {
    products.findById({ _id: req.params.id }).then((product) => {
        res.render("admin_show_product", { product })
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.get("/products/:id", (req, res) => {
    products.findById({ _id: req.params.id }).then((product) => {

        res.render("admin_edit_product", { product })

    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.put("/products/:id", (req, res) => {
    products.updateOne({ _id: req.params.id },

        {
            $set: {
                title: req.body.title,
                category: req.body.category,
                imagePath: req.body.imagePath,
                product_description: req.body.product_description,
                price_description: req.price_description,
                price:req.body.price,

            }
        }).then((product) => {

        res.redirect("/")

    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.delete("/products/:id/", (req, res) => {
    products.deleteOne({_id:req.params.id}).then((product) => {
        
        res.redirect("/");

    }).catch((error) => {
        res.status(500).send(error)
    })
})


app.get("/admin/update", (req, res) => {

    res.render("admin_search_filter_product")

})


app.post("/products/search", (req, res) => {

    const title = req.body.title
    const category = req.body.category

    if (category === "all") {
        products.find({ title: { $regex: title } }).then((products) => {
            res.json(products)
        }).catch((error) => {
            res.json(error)
        })
    }
    else {
        product.find({ title: { $regex: title }, category: { $regex: category } }).then((products) => {
            res.send(products)
        }).catch((error) => {
            res.send(error)
        })
    }


})

app.post("/products/add", (req, res) => {

    const imagePath = "/images/" + req.body.category +"/"+ req.body.image_name;
    const add_product = new products({

        title: req.body.title,
        category: req.body.category,
        imagePath: imagePath,
        price: req.body.price,
        price_description: req.body.price_description,
        product_description: req.body.price_description

    })

    add_product.save().then((result) => {
        res.redirect("/" + req.body.category)
    }).catch((error) => {
        res.send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
