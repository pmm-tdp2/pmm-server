const express = require("express");
const PORT = 3000;
require ('custom-env').env('pmm');
var partyResource = require("./resource/partyResource"),
    travelResource = require("./resource/travelResource"),
    scoreResource = require("./resource/scoreResource");
var http = require("http");
const app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/home", (req,res) => {
    console.log("response " + req.url);
    res.send("hello !!!");
});

// Routing to other responsable to handle request
app.use("", partyResource);
app.use("", travelResource);
app.use("", scoreResource);
app.use(express.static("public"));

io.on('connection', (socket) => {
    console.log("one  connected :" + socket.id);

    socket.emit("message", {
        id:1,
        text: "i'm a message",
        author: "app-server"
    });
});

app.listen(process.env.PORT || PORT, ()=> {
    console.log("Listen at port : " + process.env.PORT);
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;
