import { Schema } from "mongoose"

export interface quadrinhoType {
    title: { type: String, required: true},
    description: { type: String, required: true},
    creation_date: { type: Date, default: Date.now},
    conclusion_date: { type: Date},
    type: String,
    criador: {
        type: Schema.Types.ObjectId,
        ref: 'Criador', required: false
    },
    status: { type: String, enum: ['pendente','em andamento','concluída'], required: true},
    author: { 
        type: Schema.Types.ObjectId,
        ref: 'Personagem', required: true 
    },
}