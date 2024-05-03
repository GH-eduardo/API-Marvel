import { Schema } from "mongoose"

export interface userType {
    name: { type: String, required: true},
    weight: { type: Number},
    email: { type: String, required: true},
    password: { type: String, required: true}
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}