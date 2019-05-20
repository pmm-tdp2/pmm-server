"use strict";

const models = require('./sequelize')
var Sequelize = models.Sequelize;
var sequelize = models.sequelize;
var UserState = require('./userState').UserState;

class UserCredentials extends Sequelize.Model {}
UserCredentials.init({
    user_credentials_id: {
        type: Sequelize.INTEGER,
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
}, { sequelize, modelName: 'user_credentials', freezeTableName: true })

UserCredentials.belongsTo(UserState, {
    foreignKey: {
        field: 'user_state_id'
    },
});

exports.UserCredentials = UserCredentials;