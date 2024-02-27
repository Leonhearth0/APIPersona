const mongoose = require('mongoose')

const personaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom du Persona est requis"]
    },
    arcana: {
        type: String,
        required: [true, "L'arcana associé au Persona est requise"]
    },
    level: {
        type: Number,
        required: [true, "Indiquez le niveau du Persona"]
    },
    moves: {
        type: [],
        // required: [true, "Indiquez les attaques disponibles au niveau actuel"]
    }
})

const personaModel = mongoose.model('personas', personaSchema)
module.exports = personaModel