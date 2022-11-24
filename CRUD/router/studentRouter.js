const express = require("express");
const router = express.Router();
const Student = require("../model/student")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const multer = require("multer");
const fs = require("fs")

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/img")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + " " + Date.now() + ".jpg")
        }
    })

}).single("myfile")


router.get("/", (req, resp) => {
    resp.render("reg")
})



router.get("/login", (req, resp) => {
    resp.render("login")
})

router.post("/addStudent", upload, async (req, resp) => {

    const id = req.body.id
    if (id == "") {
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            pass: req.body.pass,
            img: req.file.path
        });
        try {
            const result = await student.save();
            console.log(result)
            resp.render("reg", { "msg": "Registration successfully !!!" })
        } catch (error) {
            resp.send(error)
        }
    }
    else {


        req.body.img = req.file.path
        req.body.pass = await bcrypt.hash(req.body.pass, 10);

        try {
            const result = await Student.findByIdAndUpdate(req.body.id, req.body)
            fs.unlinkSync(result.img)
            resp.redirect("view")
        } catch (error) {
            resp.send(error)
        }
    }
})


router.get("/view", auth, async (req, resp) => {
    try {
        const result = await Student.find();
        resp.render("view", { data: result })
    } catch (error) {
        resp.send(error)
    }
})


// router.delete("/students/:id", auth, async (req, resp) => {
//     try {
//         const _id = req.params.id
//         const result = await Student.findByIdAndDelete(_id)
//         resp.send(result)
//     } catch (error) {
//         resp.send(error)
//     }
// })

router.post("/userLogin", async (req, resp) => {
    try {
        const email = req.body.email;
        const pass = req.body.pass;
        //console.log(email + " " + pass);
        const result = await Student.findOne({ email: email });
        const isValid = await bcrypt.compare(pass, result.pass);

        if (!isValid) {
            resp.render("login", { err: "Invalid email or password" });
            return;
        }



        const token = await result.generatetoken();

        resp.cookie("jwt", token)


        resp.redirect("view")

    } catch (error) {
        resp.render("login", { err: "Invalid email or password1" });
    }
})

router.get("/logout", auth, async (req, resp) => {

    const user = req.user;
    const token = req.token;

    user.Tokens = user.Tokens.filter(element => {

        return element.token != token
    })

    console.log(user.Tokens);

    await user.save()
    await resp.clearCookie("jwt")
    resp.render("login")
})


router.get("/logoutall", auth, async (req, resp) => {

    const user = req.user;
    const token = req.token;

    user.Tokens = [];

    await user.save()
    await resp.clearCookie("jwt")
    resp.render("login")
})


router.get("/delete", async (req, resp) => {
    const _id = req.query.did
    try {
        const result = await Student.findByIdAndDelete(_id);
        fs.unlinkSync(result.img)
        resp.redirect("view")
    } catch (error) {
        console.log(error);
    }
})


router.get("/update", async (req, resp) => {
    const _id = req.query.uid
    try {
        const result = await Student.findOne({ _id: _id });
        resp.render("reg", { data: result })
    } catch (error) {
        console.log(error);
    }
})


module.exports = router