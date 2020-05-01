'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    // _id: {
    //   field: 'id',
    //   primaryKey: true,
    //   autoIncrement: true,
    //   type: DataTypes.INTEGER,
    // },
    displayName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    paranoid: true,
  }); 
  Profile.associate = function (models) {
    // associations can be defined here
    // Profile.hasOne( models.User, {foreignKey: "profileID" } )
    // Profile.belongsTo( models.User, {foreignKey: "_id", targetKey: "_id" } )
    Profile.belongsTo( models.User, {foreignKey: "id", targetKey: "id" } )
    // Profile.hasOne( models.User, {foreignKey: "id", targetKey: "id", constraints: false } )
  };
  return Profile;
};