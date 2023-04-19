const path = require("path")

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db" )
    },

    // qual lugar que o knex vai armazenar as informações

    migrations:{
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations" )
    },

    // vai ser executado no momento de estabelecer conexão com o banco de dados

    pool:{
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },

    // propriedade padrão para trabalhar com o sqlite3
    useNullAsDefault: true
  }
};

// __dirname - partindo desta pasta
