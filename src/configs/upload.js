const path = require("path");

const multer = require('multer')

// vai usar o crypto para gerar um hash(usa esse para evitar que tenha nome de arquivos iguais)
const crypto = require('crypto')

// vai armazenar informações que será usada como configurações
// tmp - pasta de temporário - onde a imagem chega
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

// pasta de uploads, onde a imagem vai ficar
const UPLOADS_FOLDER =  path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
  // será passado um objeto com algumas configurações
  // filename - será o nome do arquivo (file), recebe uma função
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString("hex");

      // evita que os arquivos tenham nomes iguais
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}