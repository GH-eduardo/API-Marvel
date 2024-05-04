import { Schema, model } from 'mongoose'

const quadrinhoSchema = new Schema({
    idQuadrinho: { type: Number },
    title: { type: String, required: true },
    description: { type: String },
    publication_date: { type: Date },
    cover: { type: String },
    criadores: [{
        criadorId: { type: Number },
        name: { type: String },
        role: { type: String }
    }],
    quantidadeDePaginas: { type: Number },
}, {

});

export default model("Quadrinho", quadrinhoSchema)