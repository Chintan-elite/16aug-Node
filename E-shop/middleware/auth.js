const jwt = require("jsonwebtoken")
const Admin = require("../model/Admin")

const auth = async (req, resp, next) => {

    const mytoken = req.cookies.jwt
    try {
        const ad = await jwt.verify(mytoken, process.env.S_KEY);

        const adminData = await Admin.findOne({ _id: ad._id })

        req.admin = adminData
        req.token = mytoken
        next()

    } catch (error) {

        
        resp.render("admin_login", {
            msg: "please login first"
        })
    }

}

module.exports = auth
