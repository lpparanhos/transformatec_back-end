'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Fundamentos do desenvolvedor', position: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Front-end', position: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Back-end', position: 3, created_at: new Date(), updated_at: new Date() },
      { name: 'Banco de dados', position: 4, created_at: new Date(), updated_at: new Date() },
      { name: 'Nuvem', position: 5, created_at: new Date(), updated_at: new Date() },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  }
};