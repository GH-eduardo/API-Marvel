import { Schema } from "mongoose"

export interface quadrinhoType {
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
}