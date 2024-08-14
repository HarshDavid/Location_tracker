const express = require('express');
const app = express();
const path = require("path");

// socket io http pr hi chlta h .... http nodejs ka modeule h....
const http = require("http");
const socketio = require("socket.io");


const server = http.createServer(app);

//request tranfer from frontend to backend... vice versa
const io = socketio(server);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data })
    });
    console.log("connected")
});


app.get("/", function (req, res) {
    res.render("index")
});

server.listen(3000);