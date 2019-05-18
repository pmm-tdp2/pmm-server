"use strict";

const models = require('./sequelize')

const UserState = models.sequelize.define(
    "userState", {
        user_state_id: {
            type: models.Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: models.Sequelize.STRING,
            allowNull: true
        }
    }, {}
);

UserState.sync();
module.exports = UserState;