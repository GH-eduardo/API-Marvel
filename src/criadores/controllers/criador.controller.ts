import { Request, Response } from 'express'
import criadorService from "../services/criador.service";

class criadorController {
    async create(req: Request, res: Response) {
        const createdCriador = await criadorService.create(req.body)
        res.status(201)
        return res.json(createdCriador)
    }

    async findAll(req: Request, res: Response) {
        const findedCriadores = await criadorService.findAll()
        res.status(200)
        return res.json(findedCriadores)
    }

    async findById(req: Request, res: Response) {
        const findedCriador = await criadorService.findById(req.params.id)
        res.status(200)
        return res.json(findedCriador)
    }

    async findAllByPersonagemId(req: Request, res: Response) {
        const criadores = await criadorService.findAllByPersonagemId(req.params.id);
        res.json(criadores);
    }

    async update(req: Request, res: Response) {
        const updatedCriador = await criadorService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedCriador)
    }

    async delete(req: Request, res: Response) {
        const deleted = await criadorService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }
}

export default new criadorController()