const mongoose = require("mongoose")

const url = "mongodb+srv://tops:tops123@cluster0.py7lgya.mongodb.net/mydb?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
    console.log("Db connected");
}).catch(err => {
    console.log(err);
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

const productSchema = new mongoose.Schema({
    pname: String,
    price: Number,
    qty: Number
})

const Product = new mongoose.model("Products", productSchema)

const addData = () => {

    const myUser = new User({ firstName: "Vaibhav", lastName: "Bhanderi", email: "vaibha1221@yahoo.com", phno: 9863524174 })

    myUser.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })

}



//addData();

const addProduct = async () => {
    const pd = new Product({ pname: "Phone", price: 5000, qty: 10 });
    try {
        const result = await pd.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
//addProduct();

const addAllProduct = () => {

    const p1 = new Product({ pname: "Laptop", price: 5000, qty: 40 })
    const p2 = new Product({ pname: "Mouse", price: 500, qty: 4 })
    const p3 = new Product({ pname: "Keyboard", price: 1500, qty: 14 })

    Product.insertMany([p1, p2, p3]).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })

}

//addAllProduct();

const getAllProduct = () => {

    Product.find({ pname: /^M/ }, { qty: 1, _id: 0 }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}

getAllProduct();

const deleteProduct = () => {

    Product.findByIdAndDelete("6344f52d96bef2dc074fed53").then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}

//deleteProduct();
const updateProduct = () => {

    Product.updateOne({ pname: "Laptop" }, { pname: "Laptop", price: 1000, qty: 5 }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })

}

//updateProduct();


