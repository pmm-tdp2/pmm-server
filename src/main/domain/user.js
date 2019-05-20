"use strict";

var Sequelize = require("sequelize");
var sequelize = require('./sequelize')
var Party = require('./party');
var Driver = require('./driver');
var UserState = require('./userState');
var UserCredentials = require('./userCredentials');
var FileDocuments = require("./fileDocuments");


var User = sequelize.define('user', {
    party_id: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        primaryKey: true
    }
}, {
    freezeTableName: true
});


User.belongsTo(Party, { foreignKey: 'party_id', constraints: false });

async function syncModel() {
    console.log('before');
    await FileDocuments.sync();
    await UserState.sync();
    await Party.sync();;
    await UserCredentials.sync();
    await User.sync();
    await Driver.sync();
    console.log('after');
}

syncModel();

module.exports = User;