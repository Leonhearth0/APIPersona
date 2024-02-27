const personaUserRouter = require("express").Router()
const personaUserControllers = require('../controllers/personaUserControllers')

personaUserRouter.post('/personauser', personaUserControllers.postPersonaUser)
personaUserRouter.get('/personauser', personaUserControllers.displayAllPersonaUser)
personaUserRouter.get('/personauser/:id', personaUserControllers.displayOnePersonaUser)
personaUserRouter.put('/personauser/:id', personaUserControllers.modifyPersonaUser)
personaUserRouter.delete('/personauser/:id', personaUserControllers.deletePersonaUser)



module.exports = personaUserRouter