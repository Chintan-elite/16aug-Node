const express = require("express")
const router = express.Router()
const Category = require("../model/Category")
const User = require("../model/User")
const bcrypt = require("bcryptjs")
const userauth = require("../middleware/userauth")
const Product = require("../model/Product")
const Cart = require("../model/Cart")
router.get("/", async (req, resp) => {

    try {
        const allcategory = await Category.find()
        const allproduct = await Product.find();
        resp.render("index", { catdata: allcategory, proddata: allproduct })
    } catch (error) {

    }

})

//***********cart**** */
router.get("/cart", userauth, async (req, resp) => {

    // console.log(req.user._id);
    try {
        const cartdata = await Cart.aggregate([{ $match: { 'user': req.user._id } }, { $lookup: { from: 'products', localField: 'product', foreignField: '_id', as: 'products' } }])

        //console.log(cartdata);
        resp.render("cart", { procutdata: cartdata })
    } catch (error) {
        console.log(error);
    }

})

router.get("/addtocart", userauth, async (req, resp) => {

    const pid = req.query.pid;
    const uid = req.user._id;

    try {

        const cartdata = await Cart.find({ user: uid });

        const pdata = cartdata.find(element => {
            return element.product == pid;
        })

        if (pdata) {

            resp.redirect("/");
            return;
        }

        const cart = new Cart({
            product: pid,
            user: uid
        })
        await cart.save();
        resp.redirect("/")
    } catch (error) {
        console.log(error);
    }

})

router.get("/removefromcart", userauth, async (req, resp) => {


    const cid = req.query.cid

    try {

        const cartdata = await Cart.findByIdAndDelete({ _id: cid });
        resp.redirect("cart");
    } catch (error) {
        console.log(error);
    }

})

router.post("/changeQty", userauth, async (req, resp) => {
    console.log(req.body.qty + " " + req.body.cartid);
    const cqty = req.body.qty
    const cartid = req.body.cartid

    try {

        const cartdata = await Cart.findOne({ _id: cartid });
        const uqty = Number(cartdata.qty) + Number(cqty);
        const data = await Cart.findByIdAndUpdate(cartid, { qty: uqty })
        const newdata = await Cart.findOne({ _id: cartid });
        
        resp.json({ "qty": newdata.qty })
    } catch (error) {
        console.log(error);
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
        //console.log(verify);
        if (!verify) {
            resp.render("login", { err: "Invalid username or password" })
            return;
        }

        const token = await user.generatetoken();
        resp.cookie("jwt", token)
        resp.redirect("/")

    } catch (error) {

        console.log(error);
        resp.render("login", { err: "Invalid username or password" })
    }

})



module.exports = router