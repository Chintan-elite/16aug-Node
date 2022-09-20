const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const hbs = require("hbs")
const path = require("path")

const PORT = process.env.PORT;

const viewPath = path.join(__dirname, '../templets/views')
const partialPah = path.join(__dirname, '../templets/partials')


app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialPah)

app.get("/", (req, resp) => {
    resp.render("index")
})

app.get("/about", (req, resp) => {
    resp.render("about")
})

app.get("/contact", (req, resp) => {
    resp.render("contact")
})



app.get("*", (req, resp) => {
    resp.render("error")
})

app.listen(PORT, () => {
    console.log("Server running on port : " + PORT);
})






