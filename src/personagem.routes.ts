import { Router } from 'express'
import personagemController from './personagens/controllers/personagem.controller'

const personagens = Router()
personagens.post('/personagens', personagemController.create)
personagens.get('/personagens', personagemController.findAll)
personagens.get('/personagens/:id', personagemController.findById)
personagens.put('/personagens/:id', personagemController.update)
personagens.delete('/personagens/:id', personagemController.delete)


export {
    personagens
}