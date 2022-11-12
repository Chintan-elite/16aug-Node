const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const studentSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    pass: {
        type: String
    }

})

studentSchema.pre("save", async function (next) {

    try {
        this.pass = await bcrypt.hash(this.pass, 10)
        //console.log(this.pass);
        next();
    } catch (error) {
        console.log(error);
    }

})


module.exports = new mongoose.model("Student", studentSchema)