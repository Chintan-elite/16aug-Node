const express = require("express");
const { diskStorage } = require("multer");
const app = express();
const multer = require("multer")

const upload = multer({
    storage: diskStorage({
        destination: function (req, file, cb) {
            cb(null, "img")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + " " + Date.now() + ".jpg")
        }
    })

}).single("myfile")



app.post("/upload", upload, (req, resp) => {

    resp.send(req.file.path)
    // resp.send("uploaded..")
})


app.listen(3000, () => {
    console.log("server ruinng..");
})