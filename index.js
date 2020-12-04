const express = require('express')
const path = require('path')
const hbs = require('hbs')
const products=require("./src/models/product_model").personalcare
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

app.get("/personalcare",(req,res)=>{
    products.find({}).then((result)=>{
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


