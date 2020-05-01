'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotifierGroup = sequelize.define('NotifierGroup', {
    displayName: DataTypes.STRING,
    extraData: DataTypes.JSON,
    parentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'NotifierGroups',
        key: 'id',
      }
    }
  }, {
    paranoid: true,
  });
  NotifierGroup.associate = function(models) {
    // associations can be defined here
    NotifierGroup.Notifiers = NotifierGroup.hasMany( models.Notifier, {foreignKey: 'notifierGroupID' } )
    NotifierGroup.Owner = NotifierGroup.belongsTo( models.UserGroup, {foreignKey: 'ownerID' } )
    NotifierGroup.hasMany( models.NotifierGroup, {foreignKey: 'parentID' } )

    NotifierGroup.hasMany( models.Notification, {foreignKey: "groupID" })
  };
  return NotifierGroup;
};