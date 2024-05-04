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

    async findAllByPersonagemId(userId: string) {
        const quadrinhos = await quadrinhoModel.find({ author: userId }).populate('criador');
        const criadorCounts = quadrinhos.reduce((counts: any[], quadrinho: any) => {
            if (quadrinho.criador) {
                const existingCriador = counts.find((c: any) => c.name === quadrinho.criador.name);
                if (existingCriador) {
                    existingCriador.quantidade++;
                } else {
                    counts.push({
                        name: quadrinho.criador.name,
                        color: quadrinho.criador.color,
                        quantidade: 1
                    });
                }
            }
            return counts;
        }, []);
    
        return criadorCounts;
    }

    async update(id: string, criador: criadorType) {
        const updatedCriador = await criadorModel.findByIdAndUpdate(id, {
            idCriador: criador.idCriador,
            name: criador.name,
            role: criador.role,
            quadrinhos: criador.quadrinhos,
        }, { new: true })

        return updatedCriador
    }

    async delete(id: string) {
        try {
            const criador = await criadorModel.findById(id);
            if (!criador) {
                throw new Error('Criador não encontrado');
            }

            for (let quadrinhoId of criador.quadrinhos) {
                await quadrinhoModel.findByIdAndUpdate(quadrinhoId, { $unset: { criador: "" } });
            }

            await criadorModel.findByIdAndDelete(id);

            return "criador removido com sucesso"
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover o criador: ${error}`)
        }
    }
}


export default new criadorService()