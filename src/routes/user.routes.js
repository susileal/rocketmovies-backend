const { Router, request, response } = require("express");
const multer = require("multer")
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER)

// Middleware - consegue extrair a requisição, resposta e o destino da requisição que é receptada pelo Middleware (next)
/*
function myMiddleware(request, response, next){
  console.log("Você passou pelo Middleware!");

  if(!request.body.isAdmin){
    return response.json({message: "user unauthorized"});
  }

  next();
} 
usersRoutes.post("/", myMiddleware, usersController.create);

Para atualizar o perfil do usuário é necessário está autenticado ensureAuthenticated

não vai mais precisar passar o id do usuário, pois já está sendo chamado no ensureAuthenticated

patch - quando você quer atualizar um campo específico do registro
*/


const usersController = new UsersController();
const userAvatarController = new UserAvatarController();


usersRoutes.post("/", usersController.create);

// passar o id como parâmetro
// ensureAuthenticated - para atualizar o perfil do usuário precisa está autenticado
/* não é mais necessário passar o id do usuário, 
pois já está no token usersRoutes.put("/:id", ensureAuthenticated, usersController.update);
put - atualizar mais de um campo
patch - quando se quer um campo específico 
single - poque será carregado um arquivo só
*/
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


module.exports = usersRoutes;