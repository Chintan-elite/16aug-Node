const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const studentSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    pass: {
        type: String
    },
    Tokens: [{
        token: {
            type: String
        }
    }],
    img: {
        type: String
    }

})


studentSchema.methods.generatetoken = async function (next) {

    const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
    this.Tokens = await this.Tokens.concat({ token: token })
    await this.save();
    return token;
    next();
}

studentSchema.pre("save", async function (next) {

    if (this.isModified("pass")) {
        try {
            this.pass = await bcrypt.hash(this.pass, 10)
            //console.log(this.pass);
            next();
        } catch (error) {
            console.log(error);
        }
    }


})


module.exports = new mongoose.model("Student", studentSchema)