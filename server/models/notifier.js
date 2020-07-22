const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const db = sequelize.models;

  class Notifier extends Model {
    constructor(values, options, a) {
      super(values, options);
    }

    static associate(models) {
      Notifier.belongsTo(models.NotifierGroup, {
        foreignKey: 'notifierGroupID',
        scope: {
          status: 'open',
        },
      });

      // Notifier.Data = Notifier.hasMany( models.NotificationData, { foreignKey: 'notifierID' } );

      Notifier.jncEvents = Notifier.belongsToMany(models.Event, {
        through: 'jnc_NotifierEvents',
        foreignKey: 'notifierID',
        timestamps: false,
      });
    }

    async renderDefaultNotification(event) {
      const { models } = this.sequelize;
      const notificationData = event.EventDatum;
      console.log('render default: ');

      const { title } = notificationData.data; // TODO: validate?

      // const body = JSON.stringify(notificationData.data.body); // TODO: possible html validation?
      const { body } = notificationData.data; // TODO: possible html validation?

      await models.Notification.create(
        {
          groupID: 1,
          state: 1,
          title,
          body,
        },
        {}
      );
    }

    async renderNotification(event) {
      let renderFunc = this.renderDefaultNotification;
      if (this.extraData) {
        if (this.extraData.customRenderer !== undefined) {
          renderFunc = this.extraData;
        }
      }

      await renderFunc.call(this, event);
    }
  }

  Notifier.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      notifierGroupID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'NotifierGroups',
          key: 'id',
        },
      },
      token: {
        type: DataTypes.STRING,
        defaultValue: '',
        unique: true,
        allowNull: false,
      },
      extraData: DataTypes.JSON,
    },
    {
      sequelize,
      paranoid: true,
    }
  );

  return Notifier;
};
