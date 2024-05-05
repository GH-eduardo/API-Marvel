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

    async countQuadrinhos(req: Request, res: Response) {
        const userId = req.params.id;
        const count = await quadrinhoService.countQuadrinhos(userId);
        return res.json(count);
    }

    async findQuadrinhosReleasedInPeriod(req: Request, res: Response) {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        if (typeof startDate === 'string' && typeof endDate === 'string') {
            const quadrinhos = await quadrinhoService.findQuadrinhosReleasedInPeriod(new Date(startDate), new Date(endDate));
            return res.json(quadrinhos);
        } else {
            console.log("Invalid date format, expected: yyyy-mm-dd")
        }
    }

    async findWithMostPages(req: Request, res: Response) {
        const quadrinho = await quadrinhoService.findWithMostPages();
        res.status(200);
        return res.json(quadrinho);
    }

    async findWithLeastPages(req: Request, res: Response) {
        const quadrinho = await quadrinhoService.findWithLeastPages();
        res.status(200);
        return res.json(quadrinho);
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