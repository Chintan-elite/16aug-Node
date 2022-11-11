const jwt = require("jsonwebtoken")

const auth = async (req, resp, next) => {

    const mytoken = req.header("auth-token")
    try {
        const st = await jwt.verify(mytoken, "this isloginsecretkeyforuser");
        console.log(st);
        next()

    } catch (error) {
        resp.send("Invalid token")
    }

}

module.exports = auth
