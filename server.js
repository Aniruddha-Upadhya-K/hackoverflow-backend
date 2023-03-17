const express = require('express');
const app = require('express')();
const httpServer = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"]
    }
});
const cors = require('cors');


require('dotenv').config();
app.use(cors());
app.use(express.json());

const auth = require('./routers/users.router');
const reviews = require('./routers/reviews.router');
const { socket } = require("./controllers/reviews.controller");
socket(io);

app.use(auth);
app.use(reviews);
httpServer.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
})
