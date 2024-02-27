const arcanaModel = require('../models/arcanaModel')

exports.postArcanas = async (req, res) => {
    try {
        const arcanas = new arcanaModel(req.body)
        arcanas.validateSync();
        await arcanas.save();
        res.json("Arcana bien enregistrée dans la base de donnée")
    } catch (error) {
        res.json(error.message)
    }
}

exports.displayArcanas = async (req, res) => {
    try {
        const arcanas = await arcanaModel.find()
        res.json(arcanas)
    } catch (error) {
        res.json(error.message)
    }
}