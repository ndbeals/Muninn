'use strict';
const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  let db = sequelize.models;

  class EventData extends Model {
    constructor(values, options, a) {
      super(values, options)
    }
    static associate(models) {
      // EventData.Notifier = EventData.belongsTo( models.Event , { foreignKey: 'eventID' } );
      EventData.hasMany( models.Event , { foreignKey: 'eventDataID' } );
    }

  }

  EventData.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    // notifierID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Notifier',
    //     key: 'id'
    //   }
    // },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    sender: DataTypes.JSON
  }, {
    sequelize,
    // modelName: "Event"
    paranoid: true,
    updatedAt: false,
  });

  return EventData;
};