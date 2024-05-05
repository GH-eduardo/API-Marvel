import personagemModel from '../schemas/personagem.schema'
import quadrinhoModel from '../../quadrinhos/schemas/quadrinho.schema'
import criadorModel from '../../criadores/schemas/criador.schema'
import { personagemType } from '../types/personagem.type'

class personagemService {

    async create(personagem: personagemType) {
        const createdPersonagem = await personagemModel.create(personagem)
        return createdPersonagem
    }

    async findAll() {
        const findedPersonagens = await personagemModel.find()
        return findedPersonagens
    }

    async findById(id: string) {
        const findedPersonagem = await personagemModel.findById(id)
        return findedPersonagem
    }

    async findQuadrinhosByPersonagemId(personagemId: string) {
        const personagem = await this.findById(personagemId);
        if (!personagem) {
            throw new Error('Personagem não encontrado');
        }
        return personagem.quadrinhos;
    }

    async update(id: string, personagem: personagemType) {
        const updatedPersonagem = await personagemModel.findByIdAndUpdate(id, {
            id: personagem.id,
            name: personagem.name,
            description: personagem.description,
            resourceURL: personagem.resourceURL,
            quadrinhos: personagem.quadrinhos,
            series: personagem.series
        }, { new: true })

        return updatedPersonagem
    }

    async delete(id: string) {
        try {
            const personagem = await personagemModel.findById(id);
            if (!personagem) {
                throw new Error('Personagem não encontrado');
            }

            for (let quadrinhoId of personagem.quadrinhos) {

                const quadrinho = await quadrinhoModel.findById(quadrinhoId);
                if (quadrinho && quadrinho.criadores) {
                    await criadorModel.findByIdAndUpdate(quadrinho.criadores, { $pull: { quadrinhos: quadrinhoId } });
                }
                await quadrinhoModel.findByIdAndDelete(quadrinhoId);
            }

            await personagemModel.findByIdAndDelete(id);

            return "Personagem removido com sucesso";
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover o personagem: ${error}`);
        }
    }
}


export default new personagemService()