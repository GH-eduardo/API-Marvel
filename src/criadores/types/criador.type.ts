import { ObjectId, Schema } from "mongoose"

export interface criadorType {
    name: { type: String, required: true, unique: true },
    role: { type: String },
    resourceURL: { type: String }
}