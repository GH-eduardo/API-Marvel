import { Request, Response } from 'express'
import personagemService from "../services/personagem.service";

class personagemController {
    async create(req: Request, res: Response) {
        const createdPersonagem = await personagemService.create(req.body)
        res.status(201)
        return res.json(createdPersonagem)
    }

    async findAll(req: Request, res: Response) {
        const findedPersonagens = await personagemService.findAll()
        res.status(200)
        return res.json(findedPersonagens)
    }

    async findById(req: Request, res: Response) {
        const findedPersonagem = await personagemService.findById(req.params.id)
        res.status(200)
        return res.json(findedPersonagem)
    }

    async findQuadrinhosByPersonagemId(req: Request, res: Response) {
        const quadrinhos = await personagemService.findQuadrinhosByPersonagemId(req.params.id);
        return res.json(quadrinhos);
    }

    async update(req: Request, res: Response) {
        const updatedPersonagem = await personagemService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedPersonagem)
    }

    async delete(req: Request, res: Response) {
        const deleted = await personagemService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }
}

export default new personagemController()