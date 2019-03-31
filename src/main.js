const express = require("express");
const app = express();
const PORT = 3000;
require ('custom-env').env('pmm');
var partyResource = require("./resouce/partyResource");
var travelResource = require("./resouce/travelResource");  

app.get("/home", (req,res) => {
    console.log("response " + req.url);
    res.send("Hello World !!!")
});

/* Routing to other responsable to handle request

*/
app.use("/parties", partyResource);
app.use("", travelResource);

app.listen(process.env.PORT || PORT, ()=> {
    console.log("Listen at port : " + process.env.PORT);
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;
