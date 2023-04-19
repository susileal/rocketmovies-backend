const { Router } = require("express");

const NotesController = require("../controllers/NotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router();


const notesController = new NotesController();
// para usar em todas as roras o middleware de autenticação
notesRoutes.use(ensureAuthenticated);


notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
