require('console-info');
require('console-error');
const express = require("express");
const PORT = 3000;
require('custom-env').env('pmm');
var partyResource = require("./resource/partyResource"),
    userCredentialsResource = require("./resource/userCredentialsResource"),
    userStatusResource = require("./resource/userStatusResource"),
    travelResource = require("./resource/travelResource"),
    scoreResource = require("./resource/scoreResource"),
    traceResource = require("./resource/traceResource"),
    connectionModel = require("./model/connection"),
    bodyParser = require("body-parser");
    global = require("./util/util")
const app = express();
const { Client } = require('pg');
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
app.use("/pmm", userCredentialsResource);
app.use("/pmm", userStatusResource);
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
var userID = 0;
var driverID = 0;

io.on('connection', (socket) => {
    socket.on('ROL', function (rol) {
        if (rol == "USER") {
            userID = global.incrementID(userID);
            console.info("User id " + userID + ", is connected " + socket.id);
            var connection = new connectionModel.ConnectionInfo(userID, rol, socket);
            connectionUsers.set(socket.id, connection);
            exports.connectionUsers = connectionUsers;
        } else {
            driverID = global.incrementID(driverID);
            console.info("Driver id " + driverID + ", is connected " + socket.id);
            var connection = new connectionModel.ConnectionInfo(driverID, rol, socket);
            connectionDrivers.set(socket.id, connection);
            exports.connectionDrivers = connectionDrivers;
        }
        socket.emit("ROL_RESPONSE", connection.id);
    });

    socket.on('disconnect', () => {
        if (connectionUsers.has(socket.id)) {
            var aConnection = connectionUsers.get(socket.id);
            console.info("User id " + aConnection.id + " has left : " + socket.id);
            connectionDelete.set(socket.id, aConnection);
            connectionUsers.delete(socket.id);
        }
        if (connectionDrivers.has(socket.id)) {
            var aConnection = connectionDrivers.get(socket.id);
            console.info("Driver id " + aConnection.id + " has left : " + socket.id);
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

// configure db
const clientDB = new Client({
    connectionString: process.env.DATABASE_URL_LOCAL,
    ssl: true,
});
clientDB.connect( () => console.info('main: Connected successfuly'));
exports.clientDB = clientDB;

process.on('uncaughtException', (err) => {
    console.error("========Uncaught exception========");
    console.error(err);
});

module.exports = app;