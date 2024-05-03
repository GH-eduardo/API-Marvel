import { Request, Response } from 'express'
import categoryService from "../services/category.service";

class categoryController {
    async create(req: Request, res: Response) {
        const createdCategory = await categoryService.create(req.body)
        res.status(201)
        return res.json(createdCategory)
    }

    async findAll(req: Request, res: Response) {
        const findedCategories = await categoryService.findAll()
        res.status(200)
        return res.json(findedCategories)
    }

    async findById(req: Request, res: Response) {
        const findedCategory = await categoryService.findById(req.params.id)
        res.status(200)
        return res.json(findedCategory)
    }

    async findAllByUserId(req: Request, res: Response) {
        const categories = await categoryService.findAllByUserId(req.params.id);
        res.json(categories);
    }

    async update(req: Request, res: Response) {
        const updatedCategory = await categoryService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedCategory)
    }

    async delete(req: Request, res: Response) {
        const deleted = await categoryService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }
}

export default new categoryController()