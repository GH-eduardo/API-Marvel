import { Request, Response } from 'express'
import quadrinhoService from "../services/quadrinho.service";

class quadrinhoController {
    async create(req: Request, res: Response) {
        const createdQuadrinho = await quadrinhoService.create(req.body)
        res.status(201)
        return res.json(createdQuadrinho)
    }

    async findAll(req: Request, res: Response) {
        const findedQuadrinhos = await quadrinhoService.findAll()
        res.status(200)
        return res.json(findedQuadrinhos)
    }

    async findById(req: Request, res: Response) {
        const findedQuadrinho = await quadrinhoService.findById(req.params.id)
        res.status(200)
        return res.json(findedQuadrinho)
    }

    async findAllByPersonagemId(req: Request, res: Response) {
        const quadrinhos = await quadrinhoService.findAllByPersonagemId(req.params.id);
        res.json(quadrinhos);
    }

    async filterByCriador(req: Request, res: Response) {
        const quadrinhos = await quadrinhoService.filterByCriador(req.params.id);
        return res.json(quadrinhos);
    }

    async getCompletedQuadrinhos(req: Request, res: Response) {
        const quadrinhos = await quadrinhoService.getCompletedQuadrinhos();
        res.json(quadrinhos);
    }

    async getPendingQuadrinhos(req: Request, res: Response) {
        const quadrinhos = await quadrinhoService.getPendingQuadrinhos();
        res.json(quadrinhos);
    }

    async countQuadrinhosByPersonagemId(req: Request, res: Response) {
        const userId = req.params.id;
        const count = await quadrinhoService.countQuadrinhosByPersonagemId(userId);
        res.json(count);
    }

    async findMostRecentQuadrinhoByPersonagemId(req: Request, res: Response) {
        const userId = req.params.id;
        const quadrinho = await quadrinhoService.findMostRecentQuadrinhoByPersonagemId(userId);
        res.json(quadrinho);
    }

    async findOldestQuadrinhoByPersonagemId(req: Request, res: Response) {
        const userId = req.params.id;
        const quadrinho = await quadrinhoService.findOldestQuadrinhoByPersonagemId(userId);
        res.json(quadrinho);
    }

    async findQuadrinhosDueInPeriod(req: Request, res: Response) {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        if (typeof startDate === 'string' && typeof endDate === 'string') {
            const quadrinhos = await quadrinhoService.findQuadrinhosDueInPeriod(new Date(startDate), new Date(endDate));
            return res.json(quadrinhos);
        } else {
            console.log("Invalid date format, expected: yyyy-mm-dd")
        }
    }

    async calculateAverageCompletion(req: Request, res: Response) {
        const averageCompletion = await quadrinhoService.calculateAverageCompletion()
        res.status(200)
        return res.json(averageCompletion)
    }

    async findQuadrinhoWithLongestDescription(req: Request, res: Response) {
        const quadrinho = await quadrinhoService.findQuadrinhoWithLongestDescription()
        res.status(200)
        return res.json(quadrinho)
    }

    async groupByCriador(req: Request, res: Response) {
        const groupedQuadrinhos = await quadrinhoService.groupByCriador();
        res.json(groupedQuadrinhos);
    }

    async update(req: Request, res: Response) {
        const updatedQuadrinho = await quadrinhoService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedQuadrinho)
    }

    async delete(req: Request, res: Response) {
        const deleted = await quadrinhoService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }
}

export default new quadrinhoController()