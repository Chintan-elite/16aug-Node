const mongoose = require("mongoose")


const homeSchema = new mongoose.Schema({
    homename: {
        type: String,
        unique: true
    },
    flag: {
        type: String,
        default: "available"
    },
    uname: {
        type: String
    }
})

module.exports = new mongoose.model("Home", homeSchema)