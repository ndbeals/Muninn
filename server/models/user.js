// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     'User',
//     {
//       name: {
//         allowNull: false,
//         type: DataTypes.TEXT,
//       },
//       password: {
//         allowNull: false,
//         type: DataTypes.TEXT,
//       },
//     },
//     {
//       paranoid: true,
//     }
//   );
//   User.associate = function (models) {
//     // associations can be defined here
//     // User.Group = User.belongsToMany( models.UserGroup, { through: 'jnc_UserGroups' } )
//     // User.belongsToMany( models.UserGroup, { through: 'jnc_UserGroups' } )
//     User.Group = User.belongsToMany(models.UserGroup, {
//       through: 'jnc_UserGroups',
//       foreignKey: 'userId',
//       timestamps: false,
//     });
//     // User.belongsTo( models.Profile, { foreignKey: 'profileID' })
//     User.hasOne(models.Profile, { foreignKey: 'id', targetKey: 'id', constraints: false });
//     // User.belongsTo( models.Profile, {foreignKey: "id", targetKey: "id"})
//   };
//   return User;
// };

import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

// import {Model} from "sequelize";
// const { Sequelize, Model, DataTypes } = require('sequelize');
// const db = require("../models");
// import db from "../models";

import { password_options } from '../config';

export default (sequelize, DataTypes) => {
  const db = sequelize.models;

  // console.log('seq eq: ', sequelize, Sequelize);

  class User extends Sequelize.Model {
    // constructor(values, options, a) {
    //   super(values, options);
    // }

    static associate(models) {
      // associations can be defined here
      // User.Group = User.belongsToMany( models.UserGroup, { through: 'jnc_UserGroups' } )
      // User.belongsToMany( models.UserGroup, { through: 'jnc_UserGroups' } )
      User.Group = User.belongsToMany(models.UserGroup, {
        through: 'jnc_UserGroups',
        foreignKey: 'userId',
        timestamps: false,
      });
      // User.belongsTo( models.Profile, { foreignKey: 'profileID' })
      User.hasOne(models.Profile, { foreignKey: 'id', targetKey: 'id', constraints: false });
      // User.belongsTo( models.Profile, {foreignKey: "id", targetKey: "id"})
    }

    static async login(username, password) {
      // console.log('static async login: ', this, db.User);
      let user = await this.findOne({
        where: {
          name: username,
        },
      });

      // hashed_password = await bcrypt.hash('admin', password_options.salt_rounds);

      if (user) {
        user = bcrypt.compareSync(password, user.password) ? user : null;
      }

      // return done(null, user);
      return user;
    }
  }

  User.init(
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
      sequelize,
      paranoid: true,
    }
  );

  return User;
};
