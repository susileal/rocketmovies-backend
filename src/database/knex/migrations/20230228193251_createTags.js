exports.up = knex => knex.schema.createTable("movie_tags", table => {
  table.increments("id");

  // CASCADE - se deletar a nota automaticamente será deletado a tag
  table.integer("movie_notes_id").references("id").inTable("movie_notes").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
  
  table.text("name").notNullable;
});

// down - deleta a tabela
exports.down = knex => knex.schema.dropTabela("movie_tags");
