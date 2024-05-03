import { Schema, model } from 'mongoose'

const criadorSchema = new Schema({
    name: { type: String, required: true, unique: true},
    color: {type: String, enum: ['verde','vermelho','amarelo','azul','roxo'], required: true},
    quadrinhos: [{ type: Schema.Types.ObjectId, ref: 'Quadrinho' }]
}, {

});

export default model("Criador", criadorSchema)