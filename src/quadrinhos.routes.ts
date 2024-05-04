import { Router } from 'express'
import quadrinhoController from './quadrinhos/controllers/quadrinho.controller'

const quadrinhos = Router()
quadrinhos.post('/quadrinhos', quadrinhoController.create)
quadrinhos.get('/quadrinhos', quadrinhoController.findAll)
quadrinhos.get('/quadrinhos/due-in-period', quadrinhoController.findQuadrinhosDueInPeriod)
quadrinhos.get('/quadrinhos/group-by-category', quadrinhoController.groupByCriador)
quadrinhos.get('/quadrinhos/:id', quadrinhoController.findById)
quadrinhos.get('/quadrinhos/user/:id', quadrinhoController.findAllByPersonagemId)
quadrinhos.get('/quadrinhos/user/:id/count', quadrinhoController.countQuadrinhosByPersonagemId)
quadrinhos.get('/quadrinhos/category/:id', quadrinhoController.filterByCriador)
quadrinhos.put('/quadrinhos/:id', quadrinhoController.update)
quadrinhos.delete('/quadrinhos/:id', quadrinhoController.delete)


export {
    quadrinhos
}