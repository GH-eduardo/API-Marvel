import { Router } from 'express'
import categoryController from './categories/controllers/category.controller'

const categories = Router()
categories.post('/categories', categoryController.create)
categories.get('/categories', categoryController.findAll)
categories.get('/categories/:id', categoryController.findById)
categories.get('/categories/user/:id', categoryController.findAllByUserId)
categories.put('/categories/:id', categoryController.update)
categories.delete('/categories/:id', categoryController.delete)


export {
    categories
}