import { ObjectId, Schema } from "mongoose"

export interface criadorType {
    name: { type: String, required: true, unique: true},
    color: {type: String, enum: ['verde','vermelho','amarelo','azul','roxo'], required: true, unique: true},
    quadrinhos: [{ type: Schema.Types.ObjectId, ref: 'Quadrinho' }]
}