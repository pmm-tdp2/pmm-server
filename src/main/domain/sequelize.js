"use strict";

require("custom-env").env("pmm");
var Sequelize = require("sequelize");
var pg = require("pg");

var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
});

pg.types.setTypeParser(1114, function(stringValue) {
    return new Date(stringValue + "+0300"); // ARG timezone
});

module.exports = sequelize;