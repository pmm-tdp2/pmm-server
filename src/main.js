const express = require("express");
const app = express();
const PORT = 3000;
require ('custom-env').env('pmm')

app.get("/home", (req,res) => {
    console.log("response " + req.url);
    res.send("Hello World !!!")
});

app.listen(process.env.PORT || PORT, ()=> {
    console.log("Listening to the port : " + process.env.PORT);
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;
