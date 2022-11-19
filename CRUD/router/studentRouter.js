const express = require("express");
const router = express.Router();
const Student = require("../model/student")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")


router.get("/", (req, resp) => {
    resp.render("reg")
})

router.get("/login", (req, resp) => {
    resp.render("login")
})

router.post("/addStudent", async (req, resp) => {
    console.log(req.body);
    const student = new Student(req.body);
    try {
        const result = await student.save();
        console.log(result)
        resp.render("reg", { "msg": "Registration successfully !!!" })
    } catch (error) {
        resp.send(error)
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


module.exports = router