import crypto from 'crypto';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// import {Model} from "sequelize";
// const { Sequelize, Model, DataTypes } = require('sequelize');
// const db = require("../models");
// import db from "../models";

import { token_options, password_options, logger } from '../config';

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
      logger.trace(`Attempted login on user: "${username}" with password: "${password}"`);
      const user = await this.findOne({
        where: {
          name: username,
        },
      });

      // hashed_password = await bcrypt.hash('admin', password_options.salt_rounds);

      if (user && (await bcrypt.compare(password, user.password))) {
        // user = bcrypt.compareSync(password, user.password) ? user : null;
        // user.token = uuidv4();
        user.token = crypto.randomBytes(token_options.byte_length).toString('base64');
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
