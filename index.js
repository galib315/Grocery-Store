const express = require('express');
const path = require('path');
const hbs = require('hbs');
const order_id = require("order-id")
const products = require("./src/models/product_model").product;
const orders = require("./src/models/order_model")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require("multer")
const fs = require("fs")

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
const viewsDirectory = path.join(__dirname, "src/views");
const partialsPath = path.join(__dirname, "src/views/partials");


const upload = multer({
    dest: path.join(__dirname, "/public/images/")
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


//setting the properties for express
app.set('view engine', '.hbs');
app.set('views', viewsDirectory);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json())

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

        await products.find({ is_deleted: false }).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {
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
        await products.countDocuments({ category: req.params.category, is_deleted: false }, function (error, counts) {
            totalPages = Math.ceil(counts / itemLimit);
        });

        await products.find({ category: req.params.category,is_deleted: false }).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {
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


//route to admin add page
app.get("/admin/add", (req, res) => {

    res.render("admin_add_product")
})

//route for adding a new product by admin
app.post("/products/add",  upload.single("file"), async (req, res) => {

    if (req.file) {

        const handleError = (err, res) => {
            res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
        };

        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "/public/images/" + req.body.category + "/" + req.body.image_name)
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
        });
    }
    else{
        res.send("Kindly upload an image for the Product")
    }

    const imagePath = "/images/" + req.body.category + "/" + req.body.image_name;
    const add_product = new products({

        title: req.body.title,
        category: req.body.category,
        imagePath: imagePath,
        price: req.body.price,
        price_description: req.body.price_description,
        product_description: req.body.price_description

    })

   await add_product.save().then((result) => {
        res.redirect("/" + req.body.category)
    }).catch((error) => {
        res.send(error)
    })
})


//route to show a particular product details for admin
app.get("/products/:id/show", (req, res) => {
    products.findById({ _id: req.params.id }).then((product) => {
        res.render("admin_show_product", { product: product })
    }).catch((error) => {
        res.status(500).send(error)
    })
})


//route to admin edit page for editing particular product details
app.get("/products/:id", (req, res) => {
    products.findById({ _id: req.params.id }).then((product) => {

        res.render("admin_edit_product", { product })

    }).catch((error) => {
        res.status(500).send(error)
    })
})


//route to update the product details
app.put("/products/:id", upload.single("file"), (req, res) => {


    if (req.file) {

        const handleError = (err, res) => {
            res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
        };

        var words = req.body.imagePath.split("/")
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "/public/images/" + req.body.category + "/" + words[words.length - 1])
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
        });

    }

    products.updateOne({ _id: req.params.id },

        {
            $set: {
                title: req.body.title,
                category: req.body.category,
                imagePath: req.body.imagePath,
                product_description: req.body.product_description,
                price_description: req.price_description,
                price: req.body.price,
                is_deleted: req.body.is_deleted

            }
        }).then((product) => {

            res.redirect("/")

        }).catch((error) => {

            res.status(500).send(error)

        })
})


//route for soft delete
app.delete("/products/:id/", (req, res) => {
    products.updateOne({ _id: req.params.id }, {
        $set: {

            is_deleted: true
        }
    }).then((product) => {

        res.redirect("/");

    }).catch((error) => {
        res.status(500).send(error)
    })
})

//route to get the admin update page
app.get("/admin/update", (req, res) => {

    res.render("admin_search_filter_product")

})

//route for search and filtering functionality for admin
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


//route to order details after checkout 
app.post("/orders/checkout/:username", async (req, res) => {
    const order_details = req.body;
    order_details["orderId"] = order_id.generate()

    const new_order = new order(order_details)

    await new_order.save().then(() => {
        res.render("show_order", { order: order_details })
    }).catch((error) => {
        res.status(500).send(error)
    })
})

//route to order details when a user click on it's particular order history
app.get("/orders/history/:orderId", async (req, res) => {
    await orders.findOne({ orderId: req.params.orderId }).then((order) => {
        res.render("existing_order", { order: order })
    })
})

//route to order history for a particular user
app.get("/orders/:username", (req, res) => {
    orders.find({ user_email: req.params.username }).then((orders) => {
        res.render("order_history", { order: orders })
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
