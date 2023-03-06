const mongoose = require("mongoose")


const homeSchema = new mongoose.Schema({
    homename: {
        type: String
    },
    uname: {
        type: String
    }

})

module.exports = new mongoose.model("Home", homeSchema)