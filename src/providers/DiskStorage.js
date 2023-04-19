// fs - lida com manipulação de arquivos
// path - lida com os diretórios 


const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file){
    // rename é mudar o arquivo de lugar e não mudar o nome
    // pega o arquivo da pasta temporária e envia para a pasta de uploads
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file){

    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file); 

    try{
      await fs.promises.stat(filePath);
    } catch{
      return
    }

    await fs.promises.unlink(filePath);

  }
}

module.exports = DiskStorage;