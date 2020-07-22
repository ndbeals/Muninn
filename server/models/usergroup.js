module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define(
    'UserGroup',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      displayName: DataTypes.STRING,
      extraData: DataTypes.JSON,
    },
    {
      paranoid: true,
    }
  );

  UserGroup.associate = function (models) {
    // associations can be defined here
    UserGroup.Users = UserGroup.belongsToMany(models.User, {
      through: 'jnc_UserGroups',
      foreignKey: 'userGroupID',
      timestamps: false,
    });
    UserGroup.NotifierGroups = UserGroup.hasMany(models.NotifierGroup, { foreignKey: 'ownerID' });
    // UserGroup.belongsToMany( models.User, { through: models.jnc_UserGroups } )

    // UserGroup.hasMany( models.Notification, { foreignKey: 'groupID' } );
  };
  return UserGroup;
};
