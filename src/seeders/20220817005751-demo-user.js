"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "tannghi2307@gmail.com",
          password: "123456",
          username: "John Doe 1",
        },
        {
          email: "tannghi2306@gmail.com",
          password: "123456",
          username: "John Doe 2",
        },
        {
          email: "tannghi2305@gmail.com",
          password: "123456",
          username: "John Doe 3",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
