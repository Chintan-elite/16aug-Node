const mongoose = require("mongoose")


const url = "mongodb://127.0.0.1:27017/backup";

mongoose.connect(url).then(() => {
    console.log("db connected");
}).catch(err => {
    console.log(err);
})

const productSchma = new mongoose.Schema({

    pname: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    qty: {
        type: Number,
        default: 0
    }
})

const Product = new mongoose.model("Product", productSchma)

const addProduct = () => {

    const pd = new Product({ pname: "Mobile", price: 300, });

    pd.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}

addProduct();