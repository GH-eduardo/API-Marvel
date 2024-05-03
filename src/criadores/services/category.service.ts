import categoryModel from '../schemas/category.schema'
import taskModel from '../../tasks/schemas/task.schema'
import userModel from '../../users/schemas/user.schema'
import { categoryType } from '../types/category.type'

class categoryService {

    async create(category: categoryType) {
        const createdCategory = await categoryModel.create(category)
        return createdCategory
    }

    async findAll() {
        const findedCategories = await categoryModel.find()
        return findedCategories
    }

    async findById(id: string) {
        const findedCategory = await categoryModel.findById(id)
        return findedCategory
    }

    async findAllByUserId(userId: string) {
        const tasks = await taskModel.find({ author: userId }).populate('category');
        const categoryCounts = tasks.reduce((counts: any[], task: any) => {
            if (task.category) {
                const existingCategory = counts.find((c: any) => c.name === task.category.name);
                if (existingCategory) {
                    existingCategory.quantidade++;
                } else {
                    counts.push({
                        name: task.category.name,
                        color: task.category.color,
                        quantidade: 1
                    });
                }
            }
            return counts;
        }, []);
    
        return categoryCounts;
    }

    async update(id: string, category: categoryType) {
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {
            name: category.name,
            color: category.color
        }, { new: true })

        return updatedCategory
    }

    async delete(id: string) {
        try {
            const category = await categoryModel.findById(id);
            if (!category) {
                throw new Error('Categoria não encontrada');
            }

            for (let taskId of category.tasks) {
                await taskModel.findByIdAndUpdate(taskId, { $unset: { category: "" } });
            }

            await categoryModel.findByIdAndDelete(id);

            return "categoria removida com sucesso"
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover a categoria: ${error}`)
        }
    }
}


export default new categoryService()