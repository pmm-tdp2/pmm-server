require('console-info');
require('console-error');
const pg = require('pg');
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

var value = 0;

iyem = require('iyem');

app.get("/home", (req, res) => {

    console.info("response " + req.url);
    var time = 1000;
    if(value==1){
        time = 2000;
    }
    value=1;

    console.log("entra al home");
    let slowProcess = iyem.create(
        function(){console.log("entra al thread: ");
        setTimeout(()=>{
            console.log("entra al timeout");
            //res.send("hello ! !!  ");
            $.finish(0); 
        },2000);     
    });

    slowProcess.start().onFinish((result)=>{
        console.log("response:" +result);
        res.send("hello ! !!  ");
    });

    if(time == 2000){
        value = 0;
    }
});

// parse application/json
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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
var positionDrivers = new Map();
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

            //adding driver to save his position for algorithm find driver for travel
            exports.positionDrivers = positionDrivers.set(driverID,null);
        }
        console.log("response connect");
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

            //delete driver for algorithm find driver for travel
            var connection = connectionDrivers.get(socket.id);
            positionDrivers.delete(connection.driverID);
        }
        console.log("disconnect");
        socket.disconnect(true);
    });
    socket.emit("message", {
        id: 1,
        text: "i'm a message",
        author: "app-server"
    });

});

// configure db
/*const clientDB = new Client({
    connectionString: "postgres://pmm:password@localhost:5400",
    ssl: true,
});
clientDB.connect( () => console.info('main: Connected successfuly into ' + process.env.DATABASE_URL_LOCAL));
});*/


const clientDB = new pg.Client(process.env.DATABASE_URL);

clientDB.connect((err) => {
    if (err) {
        console.log("error in conecction");
    }else{
        console.log(" main: Connected successfuly");
    }
})

console.log(process.env.DATABASE_URL);
console.log("#######################");
exports.clientDB = clientDB;


process.on('uncaughtException', (err) => {
    console.error("========Uncaught exception========");
    console.error(err);
});

module.exports = app;