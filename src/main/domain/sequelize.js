"use strict";

var Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres://pmm:password@localhost:5432/pmm", {
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const models = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;