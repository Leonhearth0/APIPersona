const arcanaModel = require('../models/arcanaModel')
const personaModel = require('../models/personaModel')
const personaUserModel = require('../models/personaUserModel')

exports.postPersonas = async (req, res) => {
    try {
        const personauser = personaUserModel.findOne({ _id: req.params.idpersonauser })
        if (personauser) {
            const newpersonas = new personaModel(req.body)
            newpersonas.validateSync()
            await newpersonas.save()
            await personaUserModel.updateOne({ _id: req.params.idpersonauser }, { $push: { persona: newpersonas._id } })
            res.json("Persona bien enregistrée")
        } else {
            res.json("Pas d'Arcana trouvé")
        }

    } catch (error) {
        res.json(error.message)
    }
}

exports.displayAllPersonas = async (req, res) => {
    try {
        const arcana = req.query.arcana;
        let query = {};
        if (arcana) {
            query.arcana = arcana;
        }
        const personas = await personaModel.find(query);
        res.json(personas);
    } catch (error) {
        res.json(error.message);
    }
}

exports.displayOnePersonas = async (req, res) => {
    try {
        const personas = await personaModel.findOne({ _id: req.params.id })
        res.json(personas)
    } catch (error) {
        res.json(error);
    }
}



exports.modifyPersonas = async (req, res) => {
    try {
        const personas = await personaModel.updateOne({ _id: req.params.id }, req.body)
        res.json(personas)
    } catch (error) {
        res.json(error);
    }
}

exports.deletePersonas = async (req, res) => {
    try {
        const personauser = await personaUserModel.findOne({ _id: req.params.idpersonauser })
        if (personauser) {
            await personaModel.deleteOne({_id: req.params.id})
            await personaUserModel.updateOne({ _id: req.params.idpersonauser }, { $pull: { persona: req.params.id } })
            res.json("Persona bien supprimée")
        } else {
            res.json("Pas d'Arcana trouvé")
        }
    } catch (error) {
        res.json(error.message)
    }
}

