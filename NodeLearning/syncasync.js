const fs = require("fs")

// const data = fs.readFileSync("text.txt", "utf8");
// console.log(data);
// console.log("after data reading....");

fs.readFile("text.txt", { encoding: "utf-8" }, (err, data) => {
    console.log(data);
})
console.log("after data reading....");