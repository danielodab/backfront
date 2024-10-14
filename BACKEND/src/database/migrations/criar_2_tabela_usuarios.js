'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'usuarios',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nome: {
          allowNull: false,
          type: Sequelize.STRING
        },
        cpf: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
          validate: {
            isNumeric: true
          }
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        sexo: {
          allowNull: false,
          type: Sequelize.STRING
        },
        data_nascimento: {
          type: Sequelize.DATE
        },
        status: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        cep_endereco: {
          type: Sequelize.INTEGER
        },
        descricao_endereco: {
          type: Sequelize.STRING
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
    await queryInterface.dropTable('usuarios');
  }
};