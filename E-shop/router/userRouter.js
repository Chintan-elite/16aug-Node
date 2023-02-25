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

        var sum = 0;
        for (var i = 0; i < cartdata.length; i++) {
            sum = sum + cartdata[i].total
        }



        resp.render("cart", { procutdata: cartdata, total: sum })
    } catch (error) {
        console.log(error);
    }

})

router.get("/addtocart", userauth, async (req, resp) => {

    const pid = req.query.pid;
    const uid = req.user._id;

    try {

        const cartdata = await Cart.find({ user: uid });
        const productdata = await Product.findOne({ _id: pid })
        const pdata = cartdata.find(element => {
            return element.product == pid;
        })

        if (pdata) {

            resp.redirect("/");
            return;
        }

        const cart = new Cart({
            product: pid,
            user: uid,
            total: productdata.price
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

    const cqty = req.body.qty
    const cartid = req.body.cartid

    try {

        const cartdata = await Cart.findOne({ _id: cartid });

        const productdata = await Product.findOne({ _id: cartdata.product })
        const uqty = Number(cartdata.qty) + Number(cqty);
        if (uqty == 0 || uqty > 10 || uqty > productdata.qty) {
            return;
        }

        const ptotal = productdata.price * uqty


        const data = await Cart.findByIdAndUpdate(cartid, { qty: uqty, total: ptotal })






        resp.send("qty updated !!!")
    } catch (error) {
        console.log(error);
    }

})

const Order = require("../model/order")
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chintan.tops@gmail.com',
        pass: 'yfhbcxnqjkylysfc'
    }
})
router.get("/order", userauth, async (req, resp) => {
    const pid = req.query.pid
    const user = req.user;

    try {

        const cartData = await Cart.find({ user: user._id })

        var product = [];
        for (var i = 0; i < cartData.length; i++) {

            product[i] = {
                pid: cartData[i].product,
                qty: cartData[i].qty
            }
        }

        var row = "";
        for (var i = 0; i < product.length; i++) {

            const pdata = await Product.findOne({ _id: product[i].pid })

            const total = product[i].qty * pdata.price;

            row = row + "<tr><td>" + pdata.product + "</td><td>" + pdata.price + "</td><td>" + product[i].qty + "</td><td>" + total + "</td></tr>"
        }

        const order = new Order({ pid: pid, uid: user._id, product: product })
        const ordata = await order.save();
        var mailOptions = {
            from: 'chintan.tops@gmail.com',
            to: 'chintan.tops@gmail.com',
            subject: 'Order conformation',
            html: "<h1>Order conformation</h1><h2>Order Id :" + ordata._id + " </h2> <h2>Payment Is : " + pid + "</h2><table border='1'><tr><th>Productname</th><th>Price</th><th>Qty</th><th>total</th></tr>" + row + "</table>"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                resp.send("order confirmed !!!!")
            }
        });

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