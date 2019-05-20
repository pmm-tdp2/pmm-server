"use strict";

const models = require('./sequelize')
var Sequelize = models.Sequelize;
var sequelize = models.sequelize;
var Party = require('./party').Party;

class Driver extends Sequelize.Model {}
Driver.init({
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
}, { sequelize, modelName: 'driver', freezeTableName: true })

Driver.belongsTo(Party, {
    foreignKey: {
        field: 'party_id'
    },
});

exports.Driver = Driver;