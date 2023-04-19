// hash - função que gera a criptografia
// compare - importando o compare, pois a senha está criptografada, para poder usar na hora de fazer o checkOldPassword

const { hash, compare } = require("bcryptjs");

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {

  async create(request, response){
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
 
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
 
    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso");
    }

  // antes de cadastrar um usuário no banco
  // é necessário passar dois parâmetros a senha e o fator de complexidade

    const hashedPassword = await hash(password, 8)


    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  // rota para atualizar o usuário
  async update(request, response){
    const { name, email, password, old_password } = request.body;

    // não precisa mais pegar o id do usuário pelo parâmetro pelo const { id } = request.params;
    const user_id = request.user.id;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if(!user){
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdateEmail && userWithUpdateEmail.id != user.id){
      throw new AppError("Este email já está em uso");
    }

    /* se existir o conteúdo dentro de name, 
    então este qeu vai ser utilizado, se não existir o que vai ser utilizado é o user.name */

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    // verificando se foi digitado a senha antiga
    if(password && !old_password){
      throw new AppError("Você precisa digitar a senha antiga para definir a nova senha");
    }
    
    //verificar se a senha antiga é igual a senha que está cadastrada no banco

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      // se for falso significa dizer que a senha não é igual

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere");
      }

      // se tudo confere será atualizado

      user.password = await hash(password, 8);
    }
  
    // quem vai atualizar a data é o banco de dados - DATETIME('now') - função do banco de dados
    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now') 
      WHERE id = ?`,

      // passando o array
      [user.name, user.email, user.password, user_id]
    );

    // retornar o status de sucesso

    return response.json();
  }

}
module.exports = UsersController;