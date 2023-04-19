const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
  async update(request, response){
    const user_id = request.user.id;

    // nome do arquivo que o usuário fez o upload
    const avatarFilename = request.file.filename;

    
    const diskStorage = new DiskStorage();

    // buscar os dados do usuário para atualizar o avatar do usuário
    const user = await knex("users")
    .where({ id: user_id }).first();

    if(!user){
      throw new AppError("Somente usuários autenticados podem mudar o avatar", 401)
    }

    // se já existe uma foto, então será deletada a antiga
    if(user.avatar){
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;

    await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;