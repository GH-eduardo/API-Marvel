import { Schema, model } from 'mongoose'

const criadorSchema = new Schema({
    name: { type: String, required: true, unique: true },
    role: { type: String },
    resourceURL: { type: String }
}, {

});

export default model("Criador", criadorSchema)