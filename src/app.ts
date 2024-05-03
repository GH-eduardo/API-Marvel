import express from 'express'
import mongoose from 'mongoose'
import { quadrinhos} from './quadrinhos.routes'
import { criadores} from "./criadores.routes";
import { personagens} from "./personagens.routes";

class App {
    public express: express.Application

    constructor() {
        this.express = express()
        this.middleware()
        this.database()
        this.routes()
    }

    public middleware() {
        this.express.use(express.json())
    }

    public async database() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/API-Marvel');
            console.log('Conectado com a base de dados')
        } catch (error) {
            console.error("Erro ao conectar com a base de dados:", error)
        }
    }

    public routes() {
        this.express.use(criadores)
        this.express.use(personagens)
        this.express.use(quadrinhos)
    }
}
export default new App().express