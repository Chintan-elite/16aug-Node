const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 9000
const path = require("path")
const hbs = require("hbs")
const mongoose = require("mongoose")
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
const dburl = "mongodb+srv://tops:tops123@cluster0.py7lgya.mongodb.net/inventory?retryWrites=true&w=majority"

mongoose.connect(dburl).then(() => {
    console.log("connected");
})

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "./templetes/views"))
hbs.registerPartials(path.join(__dirname, "./templetes/partials"))

app.use("/", require("./router/userrouter"))

app.listen(PORT, (req, resp) => {
    console.log(`server running on port ${PORT}`);
})