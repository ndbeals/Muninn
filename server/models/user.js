"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      paranoid: true
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    // User.Group = User.belongsToMany( models.UserGroup, { through: 'jnc_UserGroups' } )
    // User.belongsToMany( models.UserGroup, { through: 'jnc_UserGroups' } )
    User.Group = User.belongsToMany( models.UserGroup, { through: "jnc_UserGroups", foreignKey: 'userId', timestamps: false } )
    // User.belongsTo( models.Profile, { foreignKey: 'profileID' })
    User.hasOne( models.Profile, {foreignKey: "id", targetKey: "id", constraints:false })
    // User.belongsTo( models.Profile, {foreignKey: "id", targetKey: "id"})
  };  
  return User;
};
