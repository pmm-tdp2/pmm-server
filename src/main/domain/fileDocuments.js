"use strict";

const models = require('./sequelize')
var Sequelize = models.Sequelize;
var sequelize = models.sequelize;
var Party = require('./party').Party;

class FileDocuments extends Sequelize.Model {}
FileDocuments.init({
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
}, { sequelize, modelName: 'file_documents', freezeTableName: true })

Party.belongsToMany(FileDocuments, {
    through: 'files',
    foreignKey: 'file_documents_id'
});

exports.FileDocuments = FileDocuments;