const mongoose = require('mongoose')

const arcanaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Renseignez le nom de L'Arcana"]
    },
    persona: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "personas"
            }
        ]
    }

})

const arcanaModel = mongoose.model('arcanas', arcanaSchema)
module.exports = arcanaModel