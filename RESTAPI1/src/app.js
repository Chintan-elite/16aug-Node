const express = require("express");
const app = express();
const mongoose = require("mongoose")
const PORT = 9000;

const url = "mongodb+srv://tops:tops123@cluster0.py7lgya.mongodb.net/mydb?retryWrites=true&w=majority";

app.use(express.json())

mongoose.connect(url).then(() => {
    console.log("Db connected");
}).catch(err => {
    console.log(err);
})

const stRouter = require("../router/studentRouter")
app.use("/", stRouter)

app.listen(PORT, () => {
    console.log("Server running on port : " + PORT);
})
