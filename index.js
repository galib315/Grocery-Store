const express = require('express');
const path = require('path');
const hbs = require('hbs');
const products=require("./src/models/product_model").personalcare;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var Cart = require("./src/models/cart");
const session = require('express-session');
const flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);


const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/grocery_delivery", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

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
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 60 * 60 * 1000} //persist the session for 60 minutes (converted into milliseconds)
}));
app.use(flash());

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

//root route
app.get("/",(req,res)=>{
    products.find({}).then((result)=>{
        var productChunks=[];
        var chunkSize=3;
        for (var i=0;i<result.length;i+=chunkSize){
            productChunks.push(result.slice(i,i+chunkSize));
        }
        res.render("index",{product:productChunks});
    }).catch((error)=>{
        res.status(500).send(error);
    })
});

//route to add products to the cart (redirects to the home page)
app.get('/add-to-cart/:id/:qty', function (req, res) {
    var productId = req.params.id;
    var qty = parseInt(req.params.qty);
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});
    
    products.findOne({ _id: productId }, function(err, product){
        cart.add(product, productId, qty);
        req.session.cart = cart;
        res.redirect('/');
    });
});

//route to update product quantity from the shopping cart page (stays on the current page)
app.get('/add-to-cart/:id/:qty/no-redirect', function (req, res) {
    var productId = req.params.id;
    var qty = parseInt(req.params.qty);
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});
    
    products.findOne({ _id: productId }, function(err, product){
        cart.add(product, productId, qty);
        req.session.cart = cart;
        res.redirect('/cart');
    });
});

//route to render the shopping cart page
app.get('/cart', function (req, res) {
    if (!req.session.cart) {
        return res.render('cart', {products: null});
    }
    var cart = new Cart(req.session.cart.items);
    res.render('cart', {products: cart.lookupItems(), totalPrice: parseFloat(cart.totalPrice).toFixed(2)});
});

//route to render the checkout page
app.get('/checkout', function (req, res) {
    if (!req.session.cart) {
        return res.render('cart', {products: null});
    }
    
    res.render('checkout');
});


app.listen(port, () => {
    console.log('Server is up on port ' + port);
});


