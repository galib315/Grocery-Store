const express = require('express')
const path = require('path')
const hbs = require('hbs')
<<<<<<< HEAD
const fruits=require("./src/models/fruits")
=======
const products=require("./src/models/product_model").personalcare
>>>>>>> main
require("./src/db/db_connection")

const app = express()
const port = process.env.PORT || 3000

// for customizing directories
const publicDirectoryPath = path.join(__dirname, "/public")
const viewsDirectory = path.join(__dirname, "src//views")
const partialsPath = path.join(__dirname, "src/views/partials")

//setting the properties for express
app.set('view engine', '.hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

<<<<<<< HEAD
app.get("/",(req,res)=>{
    fruits.find({}).then((result)=>{
=======
app.get("/personalcare",(req,res)=>{
    products.find({}).then((result)=>{
>>>>>>> main
        var productChunks=[]
        var chunkSize=3
        for (var i=0;i<result.length;i+=chunkSize){
            productChunks.push(result.slice(i,i+chunkSize));
        }
        res.render("index",{product:productChunks})
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


