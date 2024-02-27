const mongoose = require('mongoose')

const personaUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom du Persona est requis"]
    },
    age: {
        type: Number,
        required: [true, "Indiquez l'age de l'utilisateur"]
    },
    persona: {
        type: [{type : mongoose.Schema.ObjectId,
            ref: "personas"}],
    }
})

const personaUserModel = mongoose.model('personauser', personaUserSchema)
module.exports = personaUserModel