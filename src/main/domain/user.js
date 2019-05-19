"use strict";

const models = require('./sequelize')
var Sequelize = models.Sequelize;
var sequelize = models.sequelize;
var Party = require('./party').Party;
var UserState = require('./userState').UserState;
var UserCredentials = require('./userCredentials').UserCredentials;

class User extends Sequelize.Model {}
User.init({
    party_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true,
        primaryKey: true
    }
}, { sequelize, modelName: 'user', freezeTableName: true })

User.belongsTo(Party, {
    foreignKey: {
        field: 'party_id'
    },
});

async function syncModel() {
    console.log('before');

    await UserState.sync();
    await Party.sync();;
    await UserCredentials.sync();
    await User.sync();
    console.log('after');
}

syncModel();

exports.User = User;