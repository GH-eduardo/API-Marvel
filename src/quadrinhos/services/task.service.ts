import taskModel from '../schemas/task.schema'
import userModel from '../../users/schemas/user.schema'
import categoryModel from '../../categories/schemas/category.schema'
import { taskType } from '../types/task.type'

class taskService {

    async create(task: taskType) {
        const createdTask = await taskModel.create(task)
        const updatedUser = await userModel.findByIdAndUpdate(
            task.author,
            { $push: { tasks: createdTask._id } },
            { new: true }
        );
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            task.category,
            { $push: { tasks: createdTask._id } },
            { new: true }
        );
        return createdTask
    }

    async findAll() {
        const findedTasks = await taskModel.find()
        return findedTasks
    }

    async findById(id: string) {
        const findedTask = await taskModel.findById(id)
        return findedTask
    }

    async findAllByUserId(userId: string) {
        return await taskModel.find({ author: userId });
    }

    async filterByCategory(categoryId: string) {
        const tasks = await taskModel.find({ category: categoryId });
        return tasks;
    }

    async getCompletedTasks() {
        return taskModel.find({ status: 'concluída' });
    }

    async getPendingTasks() {
        return taskModel.find({ status: 'pendente' });
    }

    async countTasksByUserId(userId: string) {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user.tasks.length;
    }

    async findMostRecentTaskByUserId(userId: string) {
        const task = await taskModel.findOne({ author: userId }).sort({ creation_date: -1 });
        return task;
    }

    async findOldestTaskByUserId(userId: string) {
        const task = await taskModel.findOne({ author: userId }).sort({ creation_date: 1 });
        return task;
    }

    async findTasksDueInPeriod(startDate: Date, endDate: Date) {
        const tasks = await taskModel.find({
            creation_date: {
                $gte: startDate,
                $lte: endDate
            }
        });
        return tasks;
    }

    async calculateAverageCompletion() {
        const tasks = await taskModel.find();
        const completedTasks = tasks.filter(task => task.status === 'concluída');
        return ("A média geral de conclusão de tarefas é de: " + (completedTasks.length / tasks.length).toFixed(2));
    }

    async findTaskWithLongestDescription() {
        const tasks = await taskModel.find();
        let longestDescriptionTask = tasks[0];
        for (let i = 1; i < tasks.length; i++) {
            if (tasks[i].description.length > longestDescriptionTask.description.length) {
                longestDescriptionTask = tasks[i];
            }
        }
        return longestDescriptionTask;
    }

    async groupByCategory() {
        const tasks = await taskModel.find().populate('category');
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

    async update(id: string, task: taskType) {
        const updatedTask = await taskModel.findByIdAndUpdate(id, {
            title: task.title,
            description: task.description,
            creation_date: task.creation_date,
            conclusion_date: task.conclusion_date,
            type: task.type,
            category: task.category,
            status: task.status,
            author: task.author
        }, { new: true })

        return updatedTask
    }

    async delete(id: string) {
        try {
            const task = await taskModel.findById(id);
            if (!task) {
                throw new Error('Tarefa não encontrada');
            }
            await userModel.findOneAndUpdate({ _id: task.author }, { $pull: { tasks: id } });
            await categoryModel.findOneAndUpdate({ _id: task.category }, { $pull: { tasks: id } });

            await taskModel.findByIdAndDelete(id);

            return "Tarefa removida com sucesso";
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover a tarefa: ${error}`);
        }
    }
}

export default new taskService()