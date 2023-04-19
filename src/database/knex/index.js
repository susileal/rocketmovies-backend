const config = require('../../../knexfile')

// importando o knex

const knex = require("knex");

// criando a conexão com o knex

const connection = knex(config.development);

module.exports = connection;