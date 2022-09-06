const fs = require("fs");


const createFile = (data) => {




    const mydata = JSON.stringify(data)
    fs.writeFile("test.json", mydata, () => {
        console.log("file written successfully");
    })
}

module.exports = { createFile }