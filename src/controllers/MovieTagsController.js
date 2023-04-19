const knex = require("../database/knex");

class MovieTagsController{
  async index(request, response){

    // pegando o user_id pelo - request.params
    // deixa de usar o params, pq está usando o user_id da autenticação
    const user_id = request.user.id;

    // vai nas tags e filtra onde seja igual ao user_id
    const tags = await knex("movie_tags")
    .where({user_id})
    .groupBy("name")
    
    
    return response.json(tags);
    }


}

module.exports = MovieTagsController;
