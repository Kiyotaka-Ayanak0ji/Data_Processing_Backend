'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const [roles] = await queryInterface.bulkInsert(
        'Roles',
        [
          { name: 'viewer', createdAt: new Date(), updatedAt: new Date() },
          { name: 'analyst', createdAt: new Date(), updatedAt: new Date() },
          { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
        ],
        { returning: true, transaction }
      );

      const [adminRole] = await queryInterface.sequelize.query(
        `SELECT id FROM "Roles" WHERE name = 'admin' LIMIT 1`,
        { type: Sequelize.QueryTypes.SELECT, transaction }
      );

      await queryInterface.bulkInsert(
        'Users',
        [
          {
            name: 'Admin',
            email: 'admin@test.com',
            passwordHash: await bcrypt.hash('Admin123', 10),
            status: 'active',
            roleId: adminRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('Users', null, {});
      await queryInterface.bulkDelete('Roles', null, {});
  }
};
