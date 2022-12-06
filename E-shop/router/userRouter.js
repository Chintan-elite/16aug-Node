const express = require("express")
const router = express.Router()
const Category = require("../model/Category")


router.get("/", async (req, resp) => {

    try {
        const allcategory = await Category.find()
        resp.render("index", { catdata: allcategory })
    } catch (error) {

    }

})

module.exports = router