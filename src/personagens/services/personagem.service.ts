import personagemModel from '../schemas/personagem.schema'
import taskModel from '../../tasks/schemas/task.schema'
import categoryModel from '../../personagens/schemas/personagem.schema'
import { userType } from '../types/personagem.type'

class userService {

    async create(personagem: userType) {
        const createdUser = await personagemModel.create(personagem)
        return createdUser
    }

    async findAll() {
        const findedUsers = await personagemModel.find()
        return findedUsers
    }

    async findById(id: string) {
        const findedUser = await personagemModel.findById(id)
        return findedUser
    }

    async update(id: string, personagem: userType) {
        const updatedUser = await personagemModel.findByIdAndUpdate(id, {
            name: personagem.name,
            weight: personagem.weight,
            email: personagem.email,
            password: personagem.password,
            tasks: personagem.tasks
        }, { new: true })

        return updatedUser
    }

    async delete(id: string) {
        try {
            const personagem = await personagemModel.findById(id);
            if (!personagem) {
                throw new Error('Usuário não encontrado');
            }

            for (let taskId of personagem.tasks) {

                const task = await taskModel.findById(taskId);
                if (task && task.personagem) {
                    await categoryModel.findByIdAndUpdate(task.personagem, { $pull: { tasks: taskId } });
                }
                await taskModel.findByIdAndDelete(taskId);
            }

            await personagemModel.findByIdAndDelete(id);
    
            return "Usuário removido com sucesso";
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover o usuário: ${error}`);
        }
    }
}


export default new userService()