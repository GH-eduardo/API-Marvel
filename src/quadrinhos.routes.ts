import { Router } from 'express'
import quadrinhoController from './quadrinhos/controllers/quadrinho.controller'

const quadrinhos = Router()
quadrinhos.post('/quadrinhos', quadrinhoController.create)
quadrinhos.get('/quadrinhos', quadrinhoController.findAll)
quadrinhos.get('/quadrinhos/completed', quadrinhoController.getCompletedQuadrinhos)
quadrinhos.get('/quadrinhos/pending', quadrinhoController.getPendingQuadrinhos)
quadrinhos.get('/quadrinhos/due-in-period', quadrinhoController.findQuadrinhosDueInPeriod)
quadrinhos.get('/quadrinhos/average-completion', quadrinhoController.calculateAverageCompletion)
quadrinhos.get('/quadrinhos/longest-description', quadrinhoController.findQuadrinhoWithLongestDescription)
quadrinhos.get('/quadrinhos/group-by-category', quadrinhoController.groupByCriador)
quadrinhos.get('/quadrinhos/:id', quadrinhoController.findById)
quadrinhos.get('/quadrinhos/user/:id', quadrinhoController.findAllByPersonagemId)
quadrinhos.get('/quadrinhos/user/:id/count', quadrinhoController.countQuadrinhosByPersonagemId)
quadrinhos.get('/quadrinhos/user/:id/most-recent', quadrinhoController.findMostRecentQuadrinhoByPersonagemId)
quadrinhos.get('/quadrinhos/user/:id/oldest', quadrinhoController.findOldestQuadrinhoByPersonagemId)
quadrinhos.get('/quadrinhos/category/:id', quadrinhoController.filterByCriador)
quadrinhos.put('/quadrinhos/:id', quadrinhoController.update)
quadrinhos.delete('/quadrinhos/:id', quadrinhoController.delete)


export {
    quadrinhos
}