import { Schema, model } from 'mongoose'

const personagemSchema = new Schema({
    name: { type: String, required: true},
    weight: { type: Number},
    email: { type: String, required: true},
    password: { type: String, required: true},
    quadrinhos: [{ type: Schema.Types.ObjectId, ref: 'Quadrinho' }]

}, {

});

export default model("Personagem", personagemSchema)