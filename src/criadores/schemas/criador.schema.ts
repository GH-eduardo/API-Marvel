import { Schema, model } from 'mongoose'

const criadorSchema = new Schema({
    idCriador: { type: Number },
    name: { type: String, required: true, unique: true },
    role: { type: String },
    quadrinhos: [{
        idQuadrinho: { type: Number },
        titulo: { type: String, required: true },
    }]
}, {

});

export default model("Criador", criadorSchema)