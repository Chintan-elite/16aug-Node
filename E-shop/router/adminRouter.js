const express = require("express")
const router = express.Router()


router.get("/admin", (req, resp) => {
    resp.render("admin_login")
})

router.get("/adminhome", (req, resp) => {
    resp.render("admin_home")
})

router.post("/adminlogin", (req, resp) => {
    resp.render("admin_home")
})
module.exports = router