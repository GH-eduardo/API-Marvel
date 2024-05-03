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

    async update(id: string, personagem: personagemType) {
        const updatedPersonagem = await personagemModel.findByIdAndUpdate(id, {
            name: personagem.name,
            weight: personagem.weight,
            email: personagem.email,
            password: personagem.password,
            quadrinhos: personagem.quadrinhos
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
                if (quadrinho && quadrinho.criador) {
                    await criadorModel.findByIdAndUpdate(quadrinho.criador, { $pull: { quadrinhos: quadrinhoId } });
                }
                await quadrinhoModel.findByIdAndDelete(quadrinhoId);
            }

            await personagemModel.findByIdAndDelete(id);
    
            return "Personagem removido com sucesso";
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover o personagems: s${error}`);
        }
    }
}


export default new personagemService()