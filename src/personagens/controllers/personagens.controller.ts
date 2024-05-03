import { Request, Response } from 'express'
import userService from "../services/user.service";

class taskController {
    async create(req: Request, res: Response) {
        const createdTask = await userService.create(req.body)
        res.status(201)
        return res.json(createdTask)
    }

    async findAll(req: Request, res: Response) {
        const findedTasks = await userService.findAll()
        res.status(200)
        return res.json(findedTasks)
    }

    async findById(req: Request, res: Response) {
        const findedTask = await userService.findById(req.params.id)
        res.status(200)
        return res.json(findedTask)
    }

    async update(req: Request, res: Response) {
        const updatedTask = await userService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedTask)
    }

    async delete(req: Request, res: Response) {
        const deleted = await userService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }
}

export default new taskController()