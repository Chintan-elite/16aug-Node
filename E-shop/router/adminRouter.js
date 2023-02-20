const express = require("express")
const router = express.Router()
const Admin = require("../model/Admin")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const Category = require("../model/Category")
const Product = require("../model/Product")
const multer = require("multer")


const Razorpay = require('razorpay');


router.get("/payment", async (req, resp) => {

    try {


        var amt = Number(req.query.amt);

        var instance = new Razorpay({ key_id: 'rzp_test_WOONFY9u511Byr', key_secret: 't9ROVnSqZbzNZr59d3KLWzJO' })

        var order = await instance.orders.create({
            amount: amt * 100,
            currency: "INR",
            receipt: "order_rcptid_11"
        })

        // resp.json({
        //     "success": true,
        //     order
        // })
        resp.send(order)
    } catch (error) {
        console.log(error);
    }

})






const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/productimage")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + " " + Date.now() + ".jpg")
        }
    })

}).single("image")





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


router.get("/category", auth, async (req, resp) => {

    try {
        const allcategory = await Category.find()
        resp.render("admin_category", { data: allcategory })
    } catch (error) {
        console.log(error);
    }

})

router.post("/addcategory", auth, async (req, resp) => {
    try {
        const cat = new Category(req.body)
        const result = await cat.save();
        resp.redirect("category")
    } catch (error) {
        console.log(error);
    }
})

router.get("/delete", async (req, resp) => {
    const _id = req.query.did;
    try {
        const result = await Category.findByIdAndDelete(_id)
        resp.redirect("category")
    } catch (error) {
        console.log(error);
    }
})

router.get("/edit", async (req, resp) => {
    const _id = req.query.did;
    try {
        const result = await Category.findOne({ _id: _id })
        const allcategory = await Category.find()
        resp.render("admin_category", { cdata: result, data: allcategory })
    } catch (error) {
        console.log(error);
    }
})



router.get("/product", auth, async (req, resp) => {

    try {
        const allcategory = await Category.find()
        const allProduct = await Product.aggregate([{ $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } }])




        resp.render("admin_products", { cdata: allcategory, data: allProduct })
    } catch (error) {
        console.log(error);
    }

})

router.post("/addproduct", upload, async (req, resp) => {

    req.body.image = req.file.path;
    try {
        const prod = new Product(req.body)
        await prod.save();
        resp.redirect("product")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router