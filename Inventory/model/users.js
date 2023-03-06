const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    uname: {
        type: String
    },
    phone: {
        type: Number
    }
})

module.exports = new mongoose.model("User", userSchema)