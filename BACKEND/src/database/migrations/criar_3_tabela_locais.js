'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'locais',
      {
        id_local: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nome_local: {
          allowNull: false,
          type: Sequelize.STRING
        },
        descricao_local: {
          allowNull: false,
          type: Sequelize.STRING
        },
        cep_local: {
            type: Sequelize.STRING
        },
        latitude_local: {
            type: Sequelize.DOUBLE
        },
        longitude_local: {
            type: Sequelize.DOUBLE
        },
        logradouro_local: {
          allowNull: false,
          type: Sequelize.STRING
        },
        cidade_local: {
          allowNull: false,
          type: Sequelize.STRING
        },
        estado_local: {
          allowNull: false,
          type: Sequelize.STRING
        },
        id_usuario: {
          allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locais');
  }
};