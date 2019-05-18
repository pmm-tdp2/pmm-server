"use strict";

var Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres://pmm:password@localhost:5432/pmm", {
    dialect: "postgres",
    protocol: "postgres",
    ssl: true
});

const models = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;