const express = require("express")
const app = express()
const path = require("path")
const http = require("http").createServer(app)

app.use(express.static(path.join(__dirname, "./public")))
app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html")
})

http.listen(9000, () => {
    console.log("server running on port : " + 9000);
})


//socket
const io = require("socket.io")(http)

io.on('connection', (socket) => {

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})

