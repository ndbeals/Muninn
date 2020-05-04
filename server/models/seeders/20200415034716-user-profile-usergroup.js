import bcrypt from 'bcrypt';

const db = require('..');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await db.User.create(
      {
        name: 'admin',
        password: bcrypt.hashSync('admin', 10),
        Profile: { displayName: 'Admin' },
        UserGroups: [{ displayName: 'Test User Group 1' }],
      },
      {
        include: [db.Profile, db.UserGroup],
      }
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
