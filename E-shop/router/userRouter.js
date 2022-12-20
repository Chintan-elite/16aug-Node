const express = require("express")
const router = express.Router()
const Category = require("../model/Category")
const User = require("../model/User")
const bcrypt = require("bcryptjs")
router.get("/", async (req, resp) => {

    try {
        const allcategory = await Category.find()
        resp.render("index", { catdata: allcategory })
    } catch (error) {

    }

})

router.get("/userReg", (req, resp) => {
    resp.render("reg")
})

router.get("/userLogin", (req, resp) => {
    resp.render("login")
})

router.post("/user_reg", async (req, resp) => {

    try {
        const user = new User(req.body)
        const result = await user.save();
        resp.render("reg", { msg: "Registration succsessfully" })
    } catch (error) {
        console.log(error);
    }

})

router.post("/user_login", async (req, resp) => {

    const email = req.body.email;
    const pass = req.body.password;
    try {

        const user = await User.findOne({ email: email });
        const verify = await bcrypt.compare(pass, user.password)
        console.log(verify);
        if (!verify) {
            resp.render("login", { err: "Invalid username or password" })
            return;
        }
        resp.render("index")

    } catch (error) {
        resp.render("login", { err: "Invalid username or password" })
    }

})



module.exports = router