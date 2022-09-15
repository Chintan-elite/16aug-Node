const express = require("express")
const app = express();
const PORT = 9000;


app.get("/", (req, resp) => {
    resp.send("Welcome , home")
})

app.get("/about", (req, resp) => {

    const location = req.query.location;
    resp.send("About us : web are working on e come platform : " + location)
})


app.get("*", (req, resp) => {
    resp.send("404 Not fount");
})

app.listen(PORT, () => {
    console.log("Server running on port" + PORT);
})

