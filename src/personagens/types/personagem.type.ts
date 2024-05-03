import { Schema } from "mongoose"

export interface personagemType {
    name: { type: String, required: true},
    weight: { type: Number},
    email: { type: String, required: true},
    password: { type: String, required: true}
    quadrinhos: [{ type: Schema.Types.ObjectId, ref: 'Quadrinho' }]
}