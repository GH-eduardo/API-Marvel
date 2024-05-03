import { Request, Response } from 'express'
import taskService from "../services/task.service";

class taskController {
    async create(req: Request, res: Response) {
        const createdTask = await taskService.create(req.body)
        res.status(201)
        return res.json(createdTask)
    }

    async findAll(req: Request, res: Response) {
        const findedTasks = await taskService.findAll()
        res.status(200)
        return res.json(findedTasks)
    }

    async findById(req: Request, res: Response) {
        const findedTask = await taskService.findById(req.params.id)
        res.status(200)
        return res.json(findedTask)
    }

    async findAllByUserId(req: Request, res: Response) {
        const tasks = await taskService.findAllByUserId(req.params.id);
        res.json(tasks);
    }

    async filterByCategory(req: Request, res: Response) {
        const tasks = await taskService.filterByCategory(req.params.id);
        return res.json(tasks);
    }

    async getCompletedTasks(req: Request, res: Response) {
        const tasks = await taskService.getCompletedTasks();
        res.json(tasks);
    }

    async getPendingTasks(req: Request, res: Response) {
        const tasks = await taskService.getPendingTasks();
        res.json(tasks);
    }

    async countTasksByUserId(req: Request, res: Response) {
        const userId = req.params.id;
        const count = await taskService.countTasksByUserId(userId);
        res.json(count);
    }

    async findMostRecentTaskByUserId(req: Request, res: Response) {
        const userId = req.params.id;
        const task = await taskService.findMostRecentTaskByUserId(userId);
        res.json(task);
    }

    async findOldestTaskByUserId(req: Request, res: Response) {
        const userId = req.params.id;
        const task = await taskService.findOldestTaskByUserId(userId);
        res.json(task);
    }

    async findTasksDueInPeriod(req: Request, res: Response) {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        if (typeof startDate === 'string' && typeof endDate === 'string') {
            const tasks = await taskService.findTasksDueInPeriod(new Date(startDate), new Date(endDate));
            return res.json(tasks);
        } else {
            console.log("Invalid date format, expected: yyyy-mm-dd")
        }
    }

    async calculateAverageCompletion(req: Request, res: Response) {
        const averageCompletion = await taskService.calculateAverageCompletion()
        res.status(200)
        return res.json(averageCompletion)
    }

    async findTaskWithLongestDescription(req: Request, res: Response) {
        const task = await taskService.findTaskWithLongestDescription()
        res.status(200)
        return res.json(task)
    }

    async groupByCategory(req: Request, res: Response) {
        const groupedTasks = await taskService.groupByCategory();
        res.json(groupedTasks);
    }

    async update(req: Request, res: Response) {
        const updatedTask = await taskService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedTask)
    }

    async delete(req: Request, res: Response) {
        const deleted = await taskService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }
}

export default new taskController()