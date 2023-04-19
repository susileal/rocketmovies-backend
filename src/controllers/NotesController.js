const knex = require("../database/knex");

const AppError = require("../utils/AppError");

class NotesController{
  async create(request, response){
    const { title, description, rating, tags} = request.body;

    // pega o user_id que vem do params
    // deixa de pegar o user_id que vem do params, pois já está sendo feito isso na autenticação - const {user_id} = request.params;
    const user_id = request.user.id;

    // inserir a nota recuperando o código da nota que foi inserida
    // note_id - armazena o id da nota que foi cadastrada

    if(rating < 1 || rating > 5){
      throw new AppError("Você precisa digitar o número entre 1 e 5");
    }

    const [movie_notes_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });

    // inserindo tags
    const tagsInsert = tags.map(name => {
      return {
        movie_notes_id,
        user_id,
        name
      }
    });

    await knex("movie_tags").insert(tagsInsert)

    return response.json();


  }

  // ver detalhes da nota

  async show(request, response){

    // recuperar o id

    const { id } = request.params

    // selecionar a nota baseada no id e não todas as notas, vai pegar a primeira - 

    const note = await knex("movie_notes").where({ id }).first();

    // mostrando detalhes nas tags
    // organizado por ordem alfabética - orderBy("name")

    const tags = await knex("movie_tags").where({ movie_notes_id: id }).orderBy("name");

    // mostrar 

    return response.json({
      ...note,
      tags
    });

  }

  async delete(request, response){

    // recuperar o id

    const { id } = request.params

    // selecionar a nota baseada no id e não todas as notas, vai pegar a primeira - 

    await knex("movie_notes").where({ id }).delete();

    return response.json();

  }

  // método responsável por listar
  async index(request, response){

    // pegando o user_id pelo - request.query, não vai pegar mais, pois está na autenticação
    const { title, tags } = request.query;

    const user_id = request.user.id;

    let notes;

    // tags.split(',') - converte o título no array usando como delimitador a vírgula
    // .map(tag => tag.trim()) - só interessa a tag
    // buscar as notas criada somente por um determinado usuário
    // vetor para comparar se tag existe ou não

    if(tags){
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex("movie_tags")
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.user_id"
        ])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.movie_notes_id")
        .orderBy("movie_notes.title");
    }else{
      notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title"); 
    }

    // vincular as tags no user_id

    const userTags = await knex("movie_tags").where({ user_id });

    const notesWithTags = notes.map( note => {
      const noteTags = userTags.filter(tag => tag.movie_notes_id === note.id)

      return{
        ...note,
      tags: noteTags
      }
    })

    
    return response.json(notesWithTags);
    }


}
module.exports = NotesController;
