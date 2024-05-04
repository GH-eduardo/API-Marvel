import { Schema, model } from 'mongoose'

const personagemSchema = new Schema({
    idPersonagem: { type: Number },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    resourseURL: { type: String },
    quadrinhos: [{
        idQuadrinho: { type: Number },
        titulo: { type: String, required: true },
    }],
    series: [{
        idSerie: { type: Number },
        titulo: { type: String, required: true },
    }]
}, {

});

export default model("Personagem", personagemSchema)