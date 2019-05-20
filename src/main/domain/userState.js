var Sequelize = require("sequelize");
var sequelize = require('./sequelize')

var UserState = sequelize.define('user_state', {
    user_state_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
        freezeTableName: true
    });

module.exports = UserState;