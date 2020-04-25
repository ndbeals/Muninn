'use strict';
// import {Model} from "sequelize";
const { Sequelize, Model, DataTypes } = require("sequelize");
// const db = require("../models");
// import db from "../models";

module.exports = (sequelize, DataTypes) => {
  // const Event = sequelize.define('Event', {
  //   type: DataTypes.SMALLINT,
  //   data: DataTypes.JSON
  // }, {});
  // Event.associate = function(models) {
  //   // associations can be defined here
  // };
  let db = sequelize.models;

  class Event extends Model {
    constructor(values, options, a) {
      super(values, options)
    }
    static associate(models) {
      Event.belongsTo(models.EventType, {foreignKey: 'type'});
      Event.belongsTo(models.EventData, {
        foreignKey: 'eventDataID',
        scope: {
          status: 'open'
        }
      });

      Event.belongsToMany( models.Notifier, { through: "jnc_NotifierEvents", foreignKey: 'eventID', timestamps: false } )
      Event.belongsToMany( models.Notification, { through: "jnc_NotificationEvents", foreignKey: 'eventID', timestamps: false } )
    }

    static async newEvent(eventType, data, options={}) {
      let type = await sequelize.models.EventType.findOne({ where:{ name: eventType } },options);

      let event = await db.Event.create({
        type: type.id,
        // data: data
        EventDatum: data
      }, Object.assign( {
        include: [ db.EventData ],
        // updatedAt: false,
        // timestamps: false,
        // silent: true,
      }, options));

      return event;
    }
  }

  Event.init({
    type: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EventTypes',
        key: 'id'
      }
    },
    eventDataID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'EventData',
        key: 'id'
      }
    },
  }, {
    sequelize,
    // modelName: "Event"
    paranoid: true,
    updatedAt: false,
  });

  return Event;
};