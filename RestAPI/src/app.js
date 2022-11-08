const express = require("express");
const app = express();
const mongoose = require("mongoose")
const PORT = 9000;

const url = "mongodb+srv://tops:tops123@cluster0.py7lgya.mongodb.net/mydb?retryWrites=true&w=majority";

app.use(express.json())

mongoose.connect(url).then(() => {
    console.log("Db connected");
}).catch(err => {
    console.log(err);
})

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
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


app.get("/users", async (req, resp) => {
    try {
        const result = await User.find();
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

app.post("/users", async (req, resp) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

app.get("/users/:id", async (req, resp) => {
    const _id = req.params.id
    try {
        const result = await User.findById(_id);
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

app.delete("/users/:id", async (req, resp) => {
    const _id = req.params.id
    try {
        const result = await User.findByIdAndDelete(_id);
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

app.put("/users/:id", async (req, resp) => {
    const _id = req.params.id
    try {
        const result = await User.findByIdAndUpdate(_id, req.body);
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

app.post("/allUser", (req, resp) => {

    const data = req.body;
    var dt = [];
    for (var i = 0; i < data.length; i++) {
        const user = new User(data[i])
        dt[i] = user
    }

    //console.log(dt);

    User.insertMany(dt).then(result => {
        resp.send(result)
    }).catch(err => {
        resp.send(err)
    })
})

app.get("*", (req, resp) => {
    resp.send("Invalid API")
})




app.listen(PORT, () => {
    console.log("Server running on port : " + PORT);
})





