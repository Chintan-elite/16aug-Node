const express = require("express");
const router = express.Router();
const Student = require("../model/student")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
//const auth = require("../middleware/auth")


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


router.get("/view", async (req, resp) => {
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
// router.post("/login", async (req, resp) => {
//     try {
//         const email = req.body.email;
//         const pass = req.body.pass;
//         //console.log(email + " " + pass);
//         const result = await Student.findOne({ email: email });
//         const isValid = await bcrypt.compare(pass, result.pass);
//         console.log(isValid);
//         if (!isValid) {
//             resp.send("Invalid email or password")vs
//             return;
//         }

//         const token = await jwt.sign({ _id: result._id }, "this isloginsecretkeyforuser")

//         resp.header("auth-token", token).send(token);

//         //resp.send(token)

//     } catch (error) {
//         resp.send("Invalid email or password")
//     }
// })
module.exports = router