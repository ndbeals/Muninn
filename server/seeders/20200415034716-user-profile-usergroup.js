'use strict';
const db = require('../models');
import bcrypt from "bcrypt";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let user = await db.User.create({
      name: "admin",
      password: bcrypt.hashSync('admin',10),
      Profile: { displayName: "Admin" },
      UserGroups: [ {displayName: "Test User Group 1"} ]
    }, {
      include: [
        db.Profile,
        db.UserGroup
      ]
    });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
