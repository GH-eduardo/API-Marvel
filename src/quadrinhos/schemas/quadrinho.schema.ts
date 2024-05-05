import { Schema, model } from 'mongoose'

const quadrinhoSchema = new Schema({
    id: { type: Number },
    title: { type: String, required: true },
    description: { type: String },
    publication_date: { type: Date },
    cover: { type: String },
    quantidadeDePaginas: { type: Number },
    criadores: [{
        name: { type: String },
    }],
    personagens: [{
        name: { type: String },
    }],
}, {

});

export default model("Quadrinho", quadrinhoSchema)