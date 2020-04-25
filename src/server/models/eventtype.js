'use strict';
// import {Model} from "sequelize";
const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventType extends Model {
    static associate(models) {
      EventType.hasMany( models.Event, { foreignKey: 'type' } );
    }
  }

  EventType.init({
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

  return EventType;
};