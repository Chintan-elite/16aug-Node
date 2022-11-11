const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// const myPass = async (pass) => {

//     const cpass = await bcrypt.hash(pass, 10);
//     const varify = await bcrypt.compare("Dhaval", cpass)
//     console.log(varify);
// }

// myPass("Dhaval");

const getToken = async () => {
    try {

        var token = await jwt.sign("wxyz", "thisismyfirstwebtokenpracical")
        // console.log(token);

        var verify = await jwt.verify(token, "thisismyfirstwebtokenpracicalg")
        console.log(verify);

    } catch (error) {

    }
}

getToken();