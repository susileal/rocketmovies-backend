const { Router } = require("express");

const usersRouter = require("./user.routes")
const notesRouter = require("./notes.routes")
const movieTagsRouter = require("./movietags.routes")
const sessionsRouter = require("./sessions.routes")


const routes = Router();


routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/movie_notes", notesRouter);
routes.use("/movie_tags", movieTagsRouter);


module.exports = routes;