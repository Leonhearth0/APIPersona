const personaUserModel = require('../models/personaUserModel')

exports.postPersonaUser = async (req, res) => {
    try {
        const personauser = new personaUserModel(req.body)
        personauser.validateSync()
        await personauser.save()
        res.json("Utilisateur de Persona bien enregistré")
    } catch (error) {
        res.json(error.message)
    }
}

exports.displayAllPersonaUser = async (req, res) => {
    try {
        const personauser = await personaUserModel.find()
        .populate('persona')
        res.json(personauser)
    }
    catch (error) {
        res.json(error.message)
    }
}

exports.displayOnePersonaUser = async (req, res) => {
    try {
        const personauser = await personaUserModel.findOne({ _id: req.params.id }).populate('persona')
        res.json(personauser)
    } catch (error) {
        res.json(error);
    }
}

exports.modifyPersonaUser = async (req, res) => {
    try {
        const personauser = await personaUserModel.updateOne({ _id: req.params.id }, req.body)
        res.json(personauser)
    } catch (error) {
        res.json(error);
    }
}

exports.deletePersonaUser = async (req, res) => {
    try {
        const personauser = await personaUserModel.deleteOne({ _id: req.params.id })
        res.json('Utilisateur de Persona bien supprimé')
    } catch (error) {
        res.json(error);
    }
}