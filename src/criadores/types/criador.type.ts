import { ObjectId, Schema } from "mongoose"

export interface criadorType {
    idCriador: { type: Number },
    name: { type: String, required: true, unique: true },
    role: { type: String },
    quadrinhos: [{
        idQuadrinho: { type: Number },
        titulo: { type: String, required: true },
    }]
}