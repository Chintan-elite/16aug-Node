const express = require("express")
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT;
const dburl = process.env.DB_URL
const path = require("path")
const hbs = require("hbs")
const viewpath = path.join(__dirname, "../templetes/view")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

mongoose.connect(dburl).then(() => {
    console.log("Db connected");
}).catch(err => {
    console.log(err);
})

app.set("view engine", "hbs");
app.set("views", viewpath)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../public")))

app.use("/", require("../router/userRouter"))
app.use("/", require("../router/adminRouter"))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})