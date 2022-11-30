const express = require("express")
const router = express.Router()
const Admin = require("../model/Admin")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

router.get("/admin", (req, resp) => {
    resp.render("admin_login")
})

router.get("/adminhome", auth, async (req, resp) => {
    resp.render("admin_home")
})

router.post("/adminlogin", async (req, resp) => {

    try {
        const username = req.body.username;
        const password = req.body.password;
        // console.log(username + " " + password);

        const admin = await Admin.findOne({ username })
        //console.log(admin);
        //console.log(admin.password);

        if (admin.password === password) {

            const token = await jwt.sign({ _id: admin._id }, process.env.S_KEY)
            resp.cookie("jwt", token)
            resp.render("admin_home", { data: admin })
        }
        else {
            resp.render("admin_login", { msg: "invalid credentials" })
        }


    } catch (error) {
        resp.render("admin_login", { msg: "invalid credentials" })
    }

})

router.get("/adminlogout", auth, (req, resp) => {
    const token = req.token
    resp.clearCookie('jwt')
    resp.render("admin_login")
})


router.get("/category", auth, (req, resp) => {
    resp.render("admin_category")
})



module.exports = router