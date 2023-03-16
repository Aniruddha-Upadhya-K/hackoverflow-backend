const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.urlencoded())
const auth = require('./routers/users.router')

app.use(auth);
app.listen(process.env.PORT, ()=>{
    console.log("Server running on port " + process.env.PORT);
})
