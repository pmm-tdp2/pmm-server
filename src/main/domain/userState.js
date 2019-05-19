"use strict";

const models = require('./sequelize')
var Sequelize = models.Sequelize;
var sequelize = models.sequelize;

class UserState extends Sequelize.Model {}
UserState.init({
    user_state_id: {
        type: models.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: models.Sequelize.STRING,
        allowNull: true
    }
}, { sequelize, modelName: 'user_state', freezeTableName: true })

exports.UserState = UserState;