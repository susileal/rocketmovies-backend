const { Router } = require("express");

const SessionsController = require("../controllers/SessionsController")

/* será necessário instanciar o SessionsController, pois ele é uma classe, 
  usando o new está colocando a classe na memória e instanciando na const
*/
const sessionsController = new SessionsController();

const sessionsRoutes = Router();

// acessando a rota através de um post (sessionsController)
sessionsRoutes.post("/", sessionsController.create)

module.exports = sessionsRoutes;