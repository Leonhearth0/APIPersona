const arcanaRouter = require("express").Router()
const arcanaControllers = require('../controllers/arcanaControllers')

arcanaRouter.post('/arcanas', arcanaControllers.postArcanas)
arcanaRouter.get('/arcanas', arcanaControllers.displayArcanas)


module.exports = arcanaRouter