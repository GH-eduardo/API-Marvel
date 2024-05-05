import { Router } from 'express'
import criadorController from './criadores/controllers/criador.controller'

const criadores = Router()
criadores.post('/criadores', criadorController.create)
criadores.get('/criadores', criadorController.findAll)
criadores.get('/criadores/:id', criadorController.findById)
criadores.put('/criadores/:id', criadorController.update)
criadores.delete('/criadores/:id', criadorController.delete)


export {
    criadores
}