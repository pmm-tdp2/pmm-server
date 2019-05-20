"use strict";

var Sequelize = require("sequelize");
var sequelize = require('./sequelize')
var Party = require('./party');


var Driver = sequelize.define("driver", {
    party_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true,
        primaryKey: true
    },
    travel_amounts: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    policy_number: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

Driver.belongsTo(Party, {foreignKey: 'party_id', constraints: false});

module.exports = Driver;