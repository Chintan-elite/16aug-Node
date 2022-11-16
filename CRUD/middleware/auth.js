const jwt = require("jsonwebtoken")

const auth = async (req, resp, next) => {

    const mytoken = req.cookies.jwt
    try {
        const st = await jwt.verify(mytoken, process.env.SECRET_KEY);

        next()

    } catch (error) {
        resp.render("login", {
            err: "please login first"
        })
    }

}

module.exports = auth
