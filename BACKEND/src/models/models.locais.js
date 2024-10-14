const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Locais = connection.define('locais', {
    id_local: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true      
    },
    nome_local: {
        type: DataTypes.STRING
    },
    descricao_local: {
        type: DataTypes.STRING
    },
    cep_local: {
        type: DataTypes.STRING
    },
    latitude_local: {
        type: DataTypes.DOUBLE
    },
    longitude_local: {
        type: DataTypes.DOUBLE
    },
    logradouro_local: {
        type: DataTypes.STRING
    },
    cidade_local: {
        type: DataTypes.STRING
    },
    estado_local: {
        type: DataTypes.STRING
    },
    id_usuario: {
      type: DataTypes.INTEGER
    }
});

module.exports = Locais;
