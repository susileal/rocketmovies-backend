const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

const { compare } = require("bcryptjs");

// função async porque vai envolver conexão com o banco de dados.
// vai ser criado uma sessão
class SessionsController {
  async create(request, response) {
    const {email, password} = request.body;
    // usa o knex para acessar a tabela de users, vai buscar pelo usuário, onde (where) - pelo email
    // first() - garante que só traga um, para não permitir que traga usuário com email repetido
    const user = await knex("users").where({email}).first();

    // se o usuário não existe
    if(!user){
      throw new AppError('E-mail e/ou senha incorreta.', 401)
    }

    // pega a senha que o usuário digitou e compara com a senha que está no bando de dados
    const passwordMatched = await compare(password, user.password);

    // verifica se o !passwordMatched é falso
    if(!passwordMatched){
      throw new AppError('E-mail e/ou senha incorreta.', 401)
    }

    // desestruturando, pegando a frase secreta e o tempo de expiração
    const { secret, expiresIn } = authConfig.jwt

    // primeiro passa uma chave vazia, depois a palavra chave(secret)
    // subject - o conteúdo que se quer inserir no token
    // String(user.id) - convertendo para texto o id do usuário

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    // devolve o usuário e o token
    return response.json({user, token});
  }
}
module.exports = SessionsController;