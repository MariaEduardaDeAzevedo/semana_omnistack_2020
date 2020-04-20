const express = require("express")
const OngController = require("../controllers/OngController")
const CasosController = require("../controllers/CasosController")
const ProfileController = require("../controllers/ProfileController")
const SessionController = require("../controllers/SessionController")
const routes = express.Router() 

//Rotas de sessão
routes.post("/session", SessionController.create)

//Rotas da ONG
routes.post("/ongs", OngController.create)
routes.get("/ongs", OngController.list)

//Rotas dos Casos
routes.post("/casos", CasosController.create)
routes.get("/casos", CasosController.list)
routes.delete("/casos/:id", CasosController.delete)

//Rotas do Perfil
routes.get("/profile", ProfileController.list)

module.exports = routes
