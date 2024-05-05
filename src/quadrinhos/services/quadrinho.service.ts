import quadrinhoModel from '../schemas/quadrinho.schema'
import personagemModel from '../../personagens/schemas/personagem.schema'
import criadorModel from '../../criadores/schemas/criador.schema'
import { quadrinhoType } from '../types/quadrinho.type'

class quadrinhoService {

    async create(quadrinho: quadrinhoType) {
        const createdQuadrinho = await quadrinhoModel.create(quadrinho)
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

    async countQuadrinhosByPersonagemId(personagemId: string) {
        const personagem = await personagemModel.findById(personagemId);
        if (!personagem) {
            throw new Error('Usuário não encontrado');
        }
        return personagem.quadrinhos.length;
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
            id: quadrinho.id,
            title: quadrinho.title,
            description: quadrinho.description,
            publication_date_date: quadrinho.publication_date,
            cover: quadrinho.cover,
            criadores: quadrinho.criadores,
            quantidadeDePaginas: quadrinho.quantidadeDePaginas
        }, { new: true })

        return updatedQuadrinho
    }

    async delete(id: string) {
        try {
            const quadrinho = await quadrinhoModel.findById(id);
            if (!quadrinho) {
                throw new Error('Quadrinho não encontrado');
            }
            await personagemModel.findOneAndUpdate({ _id: quadrinho.criadores }, { $pull: { quadrinhos: id } });
            await criadorModel.findOneAndUpdate({ _id: quadrinho.criadores }, { $pull: { quadrinhos: id } });

            await quadrinhoModel.findByIdAndDelete(id);

            return "Quadrinho removido com sucesso";
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover o quadrinho: ${error}`);
        }
    }
}

export default new quadrinhoService()