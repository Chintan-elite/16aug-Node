const mongoose = require("mongoose")


const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        unique: true
    }
})

module.exports = new mongoose.model("Category", categorySchema)