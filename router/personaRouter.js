const personaRouter = require("express").Router()
const personaControllers = require('../controllers/personaControllers')

personaRouter.post('/personauser/:idpersonauser/personas', personaControllers.postPersonas)
personaRouter.get('/personas', personaControllers.displayAllPersonas)
personaRouter.get('/personas/:id', personaControllers.displayOnePersonas)
personaRouter.put('/personas/:id', personaControllers.modifyPersonas)
personaRouter.delete('/personauser/:idpersonauser/personas/:id', personaControllers.deletePersonas)



module.exports = personaRouter