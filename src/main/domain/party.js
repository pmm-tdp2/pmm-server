"use strict";

var Sequelize = require("sequelize");
var sequelize = require('./sequelize')
var UserCredentials = require('./userCredentials');
var UserState = require('./userState');

var Party = sequelize.define("party", {
        party_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notEmpty: true,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        birthday: {
            type: Sequelize.DATE,
            allowNull: true
        },
        latitude: {
            type: Sequelize.STRING,
            allowNull: true
        },
        longitude: {
            type: Sequelize.STRING,
            allowNull: true
        },
        score: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        priority: {
            type: Sequelize.DOUBLE,
            allowNull: true
        }
    }, {
        freezeTableName: true
    });

UserCredentials.belongsTo(Party, {foreignKey: 'party_id', constraints: false});

module.exports = Party;