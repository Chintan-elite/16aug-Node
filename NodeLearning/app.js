
const { Console } = require("console")
const fs = require("fs")
const { text } = require("stream/consumers")



// fs.writeFileSync("test.txt", " my first node practical")
// console.log("file written")

//const data = fs.readFileSync("test.txt", "utf8")
//console.log(data)

// fs.appendFileSync("test.txt", "my new data")
// console.log("file updated");

//fs.renameSync("test.txt", "home.txt")

//fs.unlinkSync("home.txt")

// fs.writeFile("text.txt", "new file created", (err) => {
//     console.log("file wriiten successfully")
// })


fs.readFile("texft.txt", "utf8", (err, data) => {
    if (err) {
        console.log("error");
        return
    }
    console.log(data)
})