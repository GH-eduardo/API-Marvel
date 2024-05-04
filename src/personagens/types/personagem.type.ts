import { Schema } from "mongoose"

export interface personagemType {
    id: { type: Number },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    resourceURL: { type: String },
    quadrinhos: [{
        titulo: { type: String, required: true },
    }]
    series: [{
        titulo: { type: String, required: true },
    }]
}