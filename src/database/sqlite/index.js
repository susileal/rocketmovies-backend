// importando o banco de dados

// sqlite3 - drive que estabelece a comunicação com a base de dados
const sqlite3 = require("sqlite3");

// sqlite - responsável por conectar
const sqlite = require("sqlite");

// utilização de uma biblioteca (path), para resolver os endereços de acordo com o ambiente 

const path = require("path");


async function sqliteConnection(){
  // abrir uma conexão - sqlite.open()
  // passar um objeto com a configuração do banco de dados:
  // 1º - aonde vai ser salvo o arquivo do banco de dados - filename
  // __dirname - pega de forma automática onde está dentro do projeto
  //  ".." - voltou uma pasta para trás
  // criou um arquivo chamado database.db

  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })

  return database;

}

module.exports = sqliteConnection;