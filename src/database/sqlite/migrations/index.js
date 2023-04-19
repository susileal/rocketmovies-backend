const sqliteConnection = require("../../sqlite")
const createUsers = require("./createUsers")

// função para rodar as migrations

async function migrationsRun(){
  // se refere as tabelas que o banco vai ter
  // join juntando todas as migrations

  const schemas = [
    createUsers
  ].join('');

  // chama o sqliteConnection e faz uma promessa(then), vai executar os schemas, que são as migrations
  // caso der um error será tratado pelo catch

  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error));
}


module.exports = migrationsRun;