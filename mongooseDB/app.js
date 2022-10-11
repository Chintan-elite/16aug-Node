const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/16aug").then(() => {
    console.log("db connected !!!");
}).catch(err => {
    console.log(err)
})

const userSchema = new mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phno: {
        type: Number
    },
    doj: {
        type: Date,
        default: Date.now()
    }
})


const User = new mongoose.model("User", userSchema);

const addData = () => {

    const myUser = new User({ firstName: "Vaibhav", lastName: "Bhanderi", email: "vaibha1221@yahoo.com", phno: 9863524174 })

    myUser.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })

}

addData();