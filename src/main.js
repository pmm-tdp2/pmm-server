const express = require("express");
const app = express();

app.get("/home", (req,res) => {
    console.log("sending books");
    res.send("Hello World !!!")
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Listening to the port", app.PORT);
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;
