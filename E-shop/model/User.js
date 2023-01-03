const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    Tokens: [{
        token: {
            type: String
        }
    }]
})

userSchema.methods.generatetoken = async function (next) {

    const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
    this.Tokens = await this.Tokens.concat({ token: token })
    await this.save();
    return token;
    next();
}

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