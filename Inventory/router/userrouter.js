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



        resp.render("order")


    } catch (error) {
        console.log(error);
    }
})


router.post("/addOrder", async (req, resp) => {

    const flag = req.body.flag
    // console.log(req.body.date);
    try {

        const data = await Order.find({ $or: [{ home: { $eq: req.body.home } }, { tfrom: { $eq: req.body.home } }, { home: { $eq: req.body.tfrom } }, { tfrom: { $eq: req.body.tfrom } }] })
                            

        console.log(data);

        var max = 0;
        if (data[0] != undefined) {
            // var dt1 = data[data.length - 1].date+

            for (var i = 0; i < data.length; i++) {
                var gdt = new Date(data[i].date).getTime();
                if (gdt > max) {
                    max = gdt
                }
            }
        }
        var dt2 = req.body.date

        //var gdt1 = new Date(dt1).getTime();
        var gdt2 = new Date(dt2).getTime()
        console.log(max);
        console.log(gdt2);
        if (max > gdt2) {
            resp.render("order", { msg: "Invalid order date" })
        }
        else {

            const order = new Order(req.body)
            await order.save()
            if (flag === "sell") {


                await Home.updateOne({ homename: req.body.home }, { flag: "sell", uname: req.body.user })

            }
            else if (flag === "cancel") {
                await Home.updateOne({ homename: req.body.home }, { flag: "available", uname: "" })
            }
            else if (flag === "transfer") {

                await Home.updateOne({ homename: req.body.home }, { flag: "sell", uname: req.body.user })
                await Home.updateOne({ homename: req.body.tfrom }, { flag: "available", uname: "" })

            }
            resp.redirect("order")
        }
    } catch (error) {
        console.log(error);
    }

})

router.get("/deleteorder", async (req, resp) => {

    try {

        const _id = req.query.did
        const dlt = await Order.findByIdAndDelete(_id);
        await Home.updateOne({ homename: dlt.home }, { flag: "available" })
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

router.get("/soldhome", async (req, resp) => {

    try {
        const data = await Home.find({ flag: 'sell' });
        const user = await User.find();

        const alldata = {
            data, user
        }

        resp.send(alldata)
    } catch (error) {

    }

})

router.get("/userbyhome", async (req, resp) => {
    const home = req.query.home

    try {
        const homedata = await Home.findOne({ homename: home })

        resp.send(homedata);

    } catch (error) {

    }
})

router.get("/transferHome", async (req, resp) => {

    try {
        const data1 = await Home.find({ flag: 'sell' });
        const data2 = await Home.find({ flag: 'available' });

        const alldata = {
            data1, data2
        }

        resp.send(alldata)


    } catch (error) {

    }

})


router.get("/homeinfo", async (req, resp) => {
    try {

        const h = req.query.home

        const data = await Order.find({ $or: [{ home: { $eq: h } }, { tfrom: { $eq: h } }] })
        resp.send(data)

    } catch (error) {
        console.log(error);
    }
})
router.get("/userinfo", async (req, resp) => {
    try {

        const h = req.query.user

        const data = await Order.find({ user: h })
        resp.send(data)

    } catch (error) {
        console.log(error);
    }
})

router.get("/allorderdata", async (req, resp) => {
    try {
        const data = await Order.find()
        resp.send(data)
    } catch (error) {

    }

})

router.get("/homeanduserinfo", async (req, resp) => {
    try {

        const user = await User.find();
        const home = await Home.find();
        const alldata = {
            user, home
        }
        resp.send(alldata)

    } catch (error) {

    }
})


module.exports = router