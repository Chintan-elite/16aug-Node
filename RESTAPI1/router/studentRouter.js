const express = require("express");
const router = express.Router();
const Student = require("../model/student")
const bcrypt = require("bcryptjs")
router.post("/students", async (req, resp) => {
    //console.log(req.body);
    const student = new Student(req.body);
    try {
        const result = await student.save();
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})
router.get("/students", async (req, resp) => {
    try {
        const result = await Student.find();
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})
router.delete("/students/:id", async (req, resp) => {
    try {
        const _id = req.params.id
        const result = await Student.findByIdAndDelete(_id)
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})
router.post("/login", async (req, resp) => {
    try {
        const email = req.body.email;
        const pass = req.body.pass;
        //console.log(email + " " + pass);
        const result = await Student.findOne({ email: email });
        const isValid = await bcrypt.compare(pass, result.pass);
        console.log(isValid);
        if (!isValid) {
            resp.send("Invalid email or password")
            return;
        }
        resp.send("welcome")
        
    } catch (error) {
        resp.send("Invalid email or password")
    }
})
module.exports = router