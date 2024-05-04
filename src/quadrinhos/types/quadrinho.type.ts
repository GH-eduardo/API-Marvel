import { Schema } from "mongoose"

export interface quadrinhoType {
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
}