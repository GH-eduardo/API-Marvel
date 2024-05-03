import quadrinhoModel from '../schemas/quadrinho.schema'
import personagemModel from '../../personagens/schemas/personagem.schema'
import criadorModel from '../../criadores/schemas/criador.schema'
import { quadrinhoType } from '../types/quadrinho.type'

class quadrinhoService {

    async create(quadrinho: quadrinhoType) {
        const createdQuadrinho = await quadrinhoModel.create(quadrinho)
        const updatedPersonagem = await personagemModel.findByIdAndUpdate(
            quadrinho.author,
            { $push: { quadrinhos: createdQuadrinho._id } },
            { new: true }
        );
        const updatedCriador = await criadorModel.findByIdAndUpdate(
            quadrinho.criador,
            { $push: { quadrinhos: createdQuadrinho._id } },
            { new: true }
        );
        return createdQuadrinho
    }

    async findAll() {
        const findedQuadrinhos = await quadrinhoModel.find()
        return findedQuadrinhos
    }

    async findById(id: string) {
        const findedQuadrinho = await quadrinhoModel.findById(id)
        return findedQuadrinho
    }

    async findAllByPersonagemId(personagemId: string) {
        return await quadrinhoModel.find({ author: personagemId });
    }

    async filterByCriador(criadorId: string) {
        const quadrinhos = await quadrinhoModel.find({ criador: criadorId });
        return quadrinhos;
    }

    async getCompletedQuadrinhos() {
        return quadrinhoModel.find({ status: 'concluída' });
    }

    async getPendingQuadrinhos() {
        return quadrinhoModel.find({ status: 'pendente' });
    }

    async countQuadrinhosByPersonagemId(personagemId: string) {
        const personagem = await personagemModel.findById(personagemId);
        if (!personagem) {
            throw new Error('Usuário não encontrado');
        }
        return personagem.quadrinhos.length;
    }

    async findMostRecentQuadrinhoByPersonagemId(personagemId: string) {
        const quadrinho = await quadrinhoModel.findOne({ author: personagemId }).sort({ creation_date: -1 });
        return quadrinho;
    }

    async findOldestQuadrinhoByPersonagemId(personagemId: string) {
        const quadrinho = await quadrinhoModel.findOne({ author: personagemId }).sort({ creation_date: 1 });
        return quadrinho;
    }

    async findQuadrinhosDueInPeriod(startDate: Date, endDate: Date) {
        const quadrinhos = await quadrinhoModel.find({
            creation_date: {
                $gte: startDate,
                $lte: endDate
            }
        });
        return quadrinhos;
    }

    async calculateAverageCompletion() {
        const quadrinhos = await quadrinhoModel.find();
        const completedQuadrinhos = quadrinhos.filter(quadrinho => quadrinho.status === 'concluída');
        return ("A média geral de conclusão de tarefas é de: " + (completedQuadrinhos.length / quadrinhos.length).toFixed(2));
    }

    async findQuadrinhoWithLongestDescription() {
        const quadrinhos = await quadrinhoModel.find();
        let longestDescriptionQuadrinho = quadrinhos[0];
        for (let i = 1; i < quadrinhos.length; i++) {
            if (quadrinhos[i].description.length > longestDescriptionQuadrinho.description.length) {
                longestDescriptionQuadrinho = quadrinhos[i];
            }
        }
        return longestDescriptionQuadrinho;
    }

    async groupByCriador() {
        const quadrinhos = await quadrinhoModel.find().populate('criador');
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

    async update(id: string, quadrinho: quadrinhoType) {
        const updatedQuadrinho = await quadrinhoModel.findByIdAndUpdate(id, {
            title: quadrinho.title,
            description: quadrinho.description,
            creation_date: quadrinho.creation_date,
            conclusion_date: quadrinho.conclusion_date,
            type: quadrinho.type,
            criador: quadrinho.criador,
            status: quadrinho.status,
            author: quadrinho.author
        }, { new: true })

        return updatedQuadrinho
    }

    async delete(id: string) {
        try {
            const quadrinho = await quadrinhoModel.findById(id);
            if (!quadrinho) {
                throw new Error('Quadrinho não encontrado');
            }
            await personagemModel.findOneAndUpdate({ _id: quadrinho.author }, { $pull: { quadrinhos: id } });
            await criadorModel.findOneAndUpdate({ _id: quadrinho.criador }, { $pull: { quadrinhos: id } });

            await quadrinhoModel.findByIdAndDelete(id);

            return "Quadrinho removido com sucesso";
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover o quadrinho: ${error}`);
        }
    }
}

export default new quadrinhoService()