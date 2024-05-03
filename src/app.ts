import express from 'express'
import mongoose from 'mongoose'
import { tasks} from './tasks.routes'
import { categories} from "./categories.routes";
import { users} from "./users.routes";

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
            await mongoose.connect('mongodb://127.0.0.1:27017/tarefas-api');
            console.log('Conectado com a base de dados')
        } catch (error) {
            console.error("Erro ao conectar com a base de dados:", error)
        }
    }

    public routes() {
        this.express.use(tasks)
        this.express.use(categories)
        this.express.use(users)
    }
}
export default new App().express