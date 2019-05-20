"use strict";

var Sequelize = require("sequelize");
var sequelize = require('./sequelize')
var Party = require('./party');

var FileDocuments = sequelize.define("file_documents", {
    file_documents_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    extension: {
        type: Sequelize.STRING,
        allowNull: true
    },
    data: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true
});

Party.hasMany(FileDocuments, {foreignKey: 'file_document_id', constraints: false});

module.exports = FileDocuments;