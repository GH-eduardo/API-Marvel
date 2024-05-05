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

    async countQuadrinhos() {
        const count = await quadrinhoModel.countDocuments()
        return ('A quantidade de quadrinhos dessa série/coleção é: ' + count)
    }

    async findQuadrinhosReleasedInPeriod(startDate: Date, endDate: Date) {
        const quadrinhos = await quadrinhoModel.find({
            publication_date: {
                $gte: startDate,
                $lte: endDate
            }
        });
        return quadrinhos;
    }

    async findWithMostPages() {
        return quadrinhoModel.find().sort({ quantidadeDePaginas: -1 }).limit(1);
    }

    async findWithLeastPages() {
        return quadrinhoModel.find().sort({ quantidadeDePaginas: 1 }).limit(1);
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