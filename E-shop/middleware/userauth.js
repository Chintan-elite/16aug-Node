const jwt = require("jsonwebtoken")
const User = require("../model/User")

const userauth = async (req, resp, next) => {

    const mytoken = req.cookies.jwt
    try {
        const ud = await jwt.verify(mytoken, process.env.SECRET_KEY);

        const userdata = await User.findOne({ _id: ud._id })

        req.user = userdata
        req.token = mytoken
        next()

    } catch (error) {
        resp.render("login", {
            err: "please login first"
        })
    }

}

module.exports = userauth
