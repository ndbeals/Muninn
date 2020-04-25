'use strict';
// import {Model} from "sequelize";
const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class NotificationType extends Model {
    static associate(models) {
      NotificationType.hasMany( models.NotificationType, { foreignKey: 'type' } );
    }
  }

  NotificationType.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
    }
  }, {
    sequelize,
    // modelName: "Event"
    timestamps: false
    // paranoid: true,
    // updatedAt: null,
  });

  return NotificationType;
};