import { Schema, model } from 'mongoose'

const personagemSchema = new Schema({
    id: { type: Number },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    resourceURL: { type: String },
    quadrinhos: [{
        titulo: { type: String, required: true },
    }],
    series: [{
        titulo: { type: String, required: true },
    }]
}, {

});

export default model("Personagem", personagemSchema)