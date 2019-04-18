require('console-info');
require('console-error');
const express = require("express");
const PORT = 3000;
require('custom-env').env('pmm');
var partyResource = require("./resource/partyResource"),
    travelResource = require("./resource/travelResource"),
    scoreResource = require("./resource/scoreResource"),
    traceResource = require("./resource/traceResource"),
    connectionModel = require("./model/connection"),
    bodyParser = require("body-parser");
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/home", (req, res) => {
    console.info("response " + req.url);
    res.send("hello !!!");
});
// parse application/json
app.use(bodyParser.json())
// Routing to other responsable to handle request
app.use("/pmm", partyResource);
app.use("/pmm", travelResource);
app.use("/pmm", scoreResource);
app.use("/pmm", traceResource);
app.use(express.static("public"));

var server = app.listen(process.env.PORT || PORT, () => {
    console.info("Listen at port : " + process.env.PORT);
})

io = require('socket.io').listen(server);
io.set('transports', ['websocket']);

var connectionUsers = new Map();
var connectionDrivers = new Map();
var connectionDelete = new Map();

io.on('connection', (socket) => {
    socket.on('ROL', function (rol) {
        var connection = new connectionModel.ConnectionInfo(socket.id, rol, socket);
        if (rol == "USER") {
            console.info("User is connected " + socket.id);
            connectionUsers.set(socket.id, connection);
            exports.connectionUsers = connectionUsers;
        } else {
            console.info("Driver is connected " + socket.id);
            connectionDrivers.set(socket.id, connection);
            exports.connectionDrivers = connectionDrivers;
        }
    });

    socket.on('disconnect', () => {
        if (connectionUsers.has(socket.id)) {
            console.info('user has left : ' + socket.id);
            connectionDelete.set(socket.id, connectionUsers.get(socket.id));
            connectionUsers.delete(socket.id);
        }
        if (connectionDrivers.has(socket.id)) {
            console.info('driver has left : ' + socket.id);
            connectionDelete.set(socket.id, connectionDrivers.get(socket.id));
            connectionDrivers.delete(socket.id);
        }
        socket.disconnect(true);
    });
    socket.emit("message", {
        id: 1,
        text: "i'm a message",
        author: "app-server"
    });

});


process.on('uncaughtException', (err) => {
    console.error("========Uncaught exception========");
    console.error(err);
});

module.exports = app;