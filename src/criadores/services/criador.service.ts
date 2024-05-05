import criadorModel from '../schemas/criador.schema'
import quadrinhoModel from '../../quadrinhos/schemas/quadrinho.schema'
import personagemModel from '../../personagens/schemas/personagem.schema'
import { criadorType } from '../types/criador.type'

class criadorService {

    async create(criador: criadorType) {
        const createdCriador = await criadorModel.create(criador)
        return createdCriador
    }

    async findAll() {
        const findedCategories = await criadorModel.find()
        return findedCategories
    }

    async findById(id: string) {
        const findedCriador = await criadorModel.findById(id)
        return findedCriador
    }

    async update(id: string, criador: criadorType) {
        const updatedCriador = await criadorModel.findByIdAndUpdate(id, {
            name: criador.name,
            role: criador.role,
            resourceURL: criador.resourceURL
        }, { new: true })

        return updatedCriador
    }

    async delete(id: string) {
        try {
            const criador = await criadorModel.findById(id);
            if (!criador) {
                throw new Error('Criador não encontrado');
            }

            await criadorModel.findByIdAndDelete(id);

            return "criador removido com sucesso"
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover o criador: ${error}`)
        }
    }
}


export default new criadorService()