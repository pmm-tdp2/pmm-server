require("console-info");
require("console-error");
const pg = require("pg");
const express = require("express");
const PORT = 3000;
require("custom-env").env("pmm");
var partyResource = require("./resource/partyResource"),
    userCredentialsResource = require("./resource/userCredentialsResource"),
    userStatusResource = require("./resource/userStatusResource"),
    travelResource = require("./resource/travelResource"),
    scoreResource = require("./resource/scoreResource"),
    traceResource = require("./resource/traceResource"),
    bodyParser = require("body-parser");

var models = require("./domain/sequelize");
models.sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");

        global = require("./util/util");
        const app = express();
        const swaggerUi = require("swagger-ui-express");
        const YAML = require("yamljs");
        const swaggerDocument = YAML.load("./swagger.yaml");
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        app.get("/home", (req, res) => {
            console.info("response " + req.url);
            res.send("hello !!!");
        });
        // parse application/json
        app.use(bodyParser.json({ limit: '5mb' }))
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        // Routing to other responsable to handle request
        app.use("/pmm", partyResource);
        app.use("/pmm", userCredentialsResource);
        app.use("/pmm", travelResource);
        app.use("/pmm", scoreResource);
        app.use("/pmm", traceResource);
        app.use("/pmm", userStatusResource);
        app.use(express.static("public"));

        var server = app.listen(process.env.PORT || PORT, () => {
            console.info("Listen at port : " + process.env.PORT);
        });

        process.on("uncaughtException", err => {
            console.error("========Uncaught exception========");
            console.error(err);
        });

        module.exports = app;
    })
    .catch(err => console.error("Unable to connect to the database:", err));