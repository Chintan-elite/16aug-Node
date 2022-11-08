const bcrypt = require("bcryptjs")


const myPass = async (pass) => {

    const cpass = await bcrypt.hash(pass, 10);
    const varify = await bcrypt.compare("Dhaval", cpass)
    console.log(varify);
}

myPass("Dhaval");