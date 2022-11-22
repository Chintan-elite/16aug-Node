const express = require("express")
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT;
const path = require("path")
const hbs = require("hbs")
const viewpath = path.join(__dirname, "../templetes/views")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const url = "mongodb+srv://tops:tops123@cluster0.py7lgya.mongodb.net/crud?retryWrites=true&w=majority"



mongoose.connect(url).then(() => {
    console.log("Db connected");
}).catch(err => {
    console.log(err);
})
// const connection = async () => {
//     try {
//         const r = await mongoose.connect(url);
//         console.log("Db connected" + r);
//     } catch (error) {
//         console.log(error);
//     }
// }
// connection();

app.set("view engine", "hbs");
app.set("views", viewpath)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../")))
const studentrouter = require("../router/studentRouter")
app.use("/", studentrouter)



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})