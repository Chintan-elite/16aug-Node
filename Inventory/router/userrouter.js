const express = require("express")
const router = express.Router()
const User = require("../model/users")
const Home = require("../model/home")
const home = require("../model/home")
const Order = require("../model/order")

router.get("/", async (req, resp) => {

    try {
        const userdata = await User.find();
        const homedata = await Home.find();
        resp.render("index", { udata: userdata, hdata: homedata })
    } catch (error) {

    }
})

router.post("/addUser", async (req, resp) => {
    try {
        const user = new User(req.body)
        await user.save();
        resp.redirect("/")

    } catch (error) {
        console.log(error);
    }

})

router.post("/addHome", async (req, resp) => {
    try {



        const home = new Home(req.body)
        await home.save();



        resp.redirect("/")

    } catch (error) {
        console.log(error.MongoServerError);
    }

})

router.get("/edithome", async (req, resp) => {
    try {
        const _id = req.query.eid
        const home = await Home.findById(_id);
        const userdata = await User.find();
        const homedata = await Home.find();
        resp.render("index", { udata: userdata, hdata: homedata, home: home })

    } catch (error) {

    }
})


router.get("/deletehome", async (req, resp) => {
    try {
        const _id = req.query.did;
        await Home.findByIdAndDelete(_id);
        resp.redirect("/")
    } catch (error) {

    }
})


router.get("/order", async (req, resp) => {
    try {

        const userData = await User.find();
        const homeData = await Home.find();
        const orderdata = await Order.find();
        resp.render("order", { udata: userData, hdata: homeData, odata: orderdata })


    } catch (error) {
        console.log(error);
    }
})


router.post("/addOrder", async (req, resp) => {
    console.log(req.body);
    try {
        const order = new Order(req.body)
        await order.save()
        await Home.updateOne({ homename: req.body.home }, { flag: "sell" })
        resp.redirect("order")
    } catch (error) {
        console.log(error);
    }
})

router.get("/deleteorder", async (req, resp) => {

    try {

        const _id = req.query.did
        await Order.findByIdAndDelete(_id);
        resp.redirect("order")

    } catch (error) {

    }
})

router.get("/availableHome", async (req, resp) => {

    try {
        const data = await Home.find({ flag: 'available' });
        const user = await User.find();

        const alldata = {
            data, user
        }

        resp.send(alldata)
    } catch (error) {

    }

})

module.exports = router