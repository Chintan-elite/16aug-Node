const jwt = require("jsonwebtoken")
const Student = require("../model/student")

const auth = async (req, resp, next) => {

    const mytoken = req.cookies.jwt
    try {
        const st = await jwt.verify(mytoken, process.env.SECRET_KEY);

        const stData = await Student.findOne({ _id: st._id })

        const tkn = stData.Tokens.filter((element) => {
            return element.token === mytoken
        })


        if (tkn[0] == undefined) {
            resp.render("login", {
                err: "please login first"
            })
        }
        req.user = stData
        req.token = mytoken
        next()

    } catch (error) {
        resp.render("login", {
            err: "please login first"
        })
    }

}

module.exports = auth
