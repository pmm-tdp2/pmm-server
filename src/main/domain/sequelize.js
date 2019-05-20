"use strict";

var Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

var models = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;