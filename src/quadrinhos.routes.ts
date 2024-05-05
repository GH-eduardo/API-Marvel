import { Router } from 'express'
import quadrinhoController from './quadrinhos/controllers/quadrinho.controller'

const quadrinhos = Router()
quadrinhos.post('/quadrinhos', quadrinhoController.create)
quadrinhos.get('/quadrinhos', quadrinhoController.findAll)
quadrinhos.get('/quadrinhos/release-in-period', quadrinhoController.findQuadrinhosReleasedInPeriod)
quadrinhos.get('/quadrinhos/:id', quadrinhoController.findById)
quadrinhos.get('/quadrinhos/count', quadrinhoController.countQuadrinhos)
quadrinhos.get('/quadrinhos/most-pages', quadrinhoController.findWithMostPages);
quadrinhos.get('/quadrinhos/least-pages', quadrinhoController.findWithLeastPages);
quadrinhos.put('/quadrinhos/:id', quadrinhoController.update)
quadrinhos.delete('/quadrinhos/:id', quadrinhoController.delete)


export {
    quadrinhos
}