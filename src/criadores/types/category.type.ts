import { ObjectId, Schema } from "mongoose"

export interface categoryType {
    name: { type: String, required: true, unique: true},
    color: {type: String, enum: ['verde','vermelho','amarelo','azul','roxo'], required: true, unique: true},
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}