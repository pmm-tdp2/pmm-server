"use strict";

var Sequelize = require("sequelize");
var sequelize = require('./sequelize')
var UserState = require('./userState');

var UserCredentials = sequelize.define('user_credentials', {
    user_credentials_id: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    },
    intent: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    register_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    last_login_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    user_state_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true
});

UserCredentials.belongsTo(UserState, { foreignKey: 'user_state_id', constraints: false });

module.exports = UserCredentials;