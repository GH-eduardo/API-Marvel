import { Router } from 'express'
import taskController from './tasks/controllers/task.controller'

const tasks = Router()
tasks.post('/tasks', taskController.create)
tasks.get('/tasks', taskController.findAll)
tasks.get('/tasks/completed', taskController.getCompletedTasks)
tasks.get('/tasks/pending', taskController.getPendingTasks)
tasks.get('/tasks/due-in-period', taskController.findTasksDueInPeriod)
tasks.get('/tasks/average-completion', taskController.calculateAverageCompletion)
tasks.get('/tasks/longest-description', taskController.findTaskWithLongestDescription)
tasks.get('/tasks/group-by-category', taskController.groupByCategory)
tasks.get('/tasks/:id', taskController.findById)
tasks.get('/tasks/user/:id', taskController.findAllByUserId)
tasks.get('/tasks/user/:id/count', taskController.countTasksByUserId)
tasks.get('/tasks/user/:id/most-recent', taskController.findMostRecentTaskByUserId)
tasks.get('/tasks/user/:id/oldest', taskController.findOldestTaskByUserId)
tasks.get('/tasks/category/:id', taskController.filterByCategory)
tasks.put('/tasks/:id', taskController.update)
tasks.delete('/tasks/:id', taskController.delete)


export {
    tasks
}