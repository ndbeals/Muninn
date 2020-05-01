'use strict';
// import {Model} from "sequelize";
const { Sequelize, Model, DataTypes } = require("sequelize");
// const db = require("../models");
// import db from "../models";

module.exports = (sequelize, DataTypes) => {
  let db = sequelize.models;

  class Notification extends Model {
    constructor(values, options, a) {
      super(values, options)
    }
    static associate(models) {
      // Notification.belongsTo(models.NotificationGroup, {foreignKey: 'groupID'});
      
      Notification.belongsTo(models.NotifierGroup, {foreignKey: 'groupID'});
      Notification.belongsToMany( models.Event, { through: "jnc_NotificationEvents", foreignKey: 'notificationID', timestamps: false } )
    }
  }

  Notification.init({
    groupID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserGroups',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'NotificationTypes',
        key: 'id',
      }
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.JSON,
    },
    deliveredAt: {
      allowNull: false,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE
    },
  }, {
    sequelize,
    // modelName: "Event"
    paranoid: true,
    updatedAt: false,
  });

  return Notification;
};