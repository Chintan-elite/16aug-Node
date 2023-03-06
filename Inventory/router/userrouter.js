const express = require("express")
const router = express.Router()
const User = require("../model/users")
const Home = require("../model/home")

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

        const id = req.body.id;
        console.log(id);
        if (id == undefined) {
            const home = new Home(req.body)
            await home.save();
        }
        else {
            await Home.findByIdAndUpdate(id, req.body)
        }


        resp.redirect("/")

    } catch (error) {
        console.log(error);
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

module.exports = router