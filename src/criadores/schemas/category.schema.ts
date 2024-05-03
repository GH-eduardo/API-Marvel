import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true},
    color: {type: String, enum: ['verde','vermelho','amarelo','azul','roxo'], required: true},
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}, {

});

export default model("Category", categorySchema)