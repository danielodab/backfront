const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Usuarios = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    sexo: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    cep_endereco: {
        type: DataTypes.STRING
    },
    descricao_endereco: {
        type: DataTypes.STRING
    }
});

module.exports = Usuarios;



