const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})


userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 10)
            //console.log(this.pass);
            next();
        } catch (error) {
            console.log(error);
        }
    }


})
module.exports = new mongoose.model("User", userSchema)