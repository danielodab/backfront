const { QueryInterface, Sequelize } = require('sequelize');
const Usuarios = require('../../models/models.usuarios')
const bcrypt = require('bcrypt')

module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('usuarios', [
          {
              nome: 'Usuário 1',
              sexo: 'Masculino',
              cpf: '12345678901',
              data_nascimento: '1990-01-01',
              email: 'usuario1@exemplo.com',
              password: await bcrypt.hash('12345', 10),
              status: false,
              cep_endereco: null,
              descricao_endereco: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              nome: 'Usuário 2',
              sexo: 'Feminino',
              cpf: '23409889012',
              data_nascimento: '1995-05-05',
              email: 'usuario2@exemplo.com',
              password: await bcrypt.hash('12345', 10),
              status: false,
              cep_endereco: null,
              descricao_endereco: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              nome: 'Usuário 3',

              sexo: 'Masculino',
              cpf: '34567890456',
              data_nascimento: '1985-10-10',
              email: 'usuario3@exemplo.com',
              password: await bcrypt.hash('12345', 10),
              status: false,
              cep_endereco: null,
              descricao_endereco: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              nome: 'Usuário 4',
              sexo: 'Feminino',
              cpf: '34567890123',
              data_nascimento: '1985-09-10',
              email: 'usuario4@exemplo.com',
              password: await bcrypt.hash('12345', 10),
              status: false,
              cep_endereco: null,
              descricao_endereco: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              nome: 'Usuário 5',
              sexo: 'Masculino',
              cpf: '37654590123',
              data_nascimento: '1985-05-10',
              email: 'usuario5@exemplo.com',
              password: await bcrypt.hash('12345', 10),
              status: false,
              cep_endereco: null,
              descricao_endereco: null,
              createdAt: new Date(),
              updatedAt: new Date()
            }         
      ], {});
  
    }
  };