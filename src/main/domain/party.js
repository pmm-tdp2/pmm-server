"use strict";

const models = require('./sequelize')
var Sequelize = models.Sequelize;
var sequelize = models.sequelize;
var UserCredentials = require('./userCredentials').UserCredentials;
var UserState = require('./userState').UserState;

class Party extends Sequelize.Model {}
Party.init({
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
}, { sequelize, modelName: 'party', freezeTableName: true })

UserCredentials.belongsTo(Party, {
    foreignKey: {
        field: 'party_id'
    },
});

exports.Party = Party;