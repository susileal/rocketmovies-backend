
// up cria a tabela
/* table.integer("user_id").references("id").inTable("users"); - 
faz referência ao id que existe dentro da tabela do usuário
não dá para criar uma nota se não existir um usuário
*/ 
exports.up = knex => knex.schema.createTable("movie_notes", table => {
  table.increments("id");
  table.text("title");
  table.text("description");
  table.integer("rating");
  table.integer("user_id").references("id").inTable("users");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());


});

// down - deleta a tabela
exports.down = knex => knex.schema.dropTabela("movie_notes");
