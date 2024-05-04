// 1. Importar o módulo crypto do Node.js, que fornece funcionalidades criptográficas.
// 2. Definir as variáveis para a chave privada, chave pública e timestamp.
// 3. Concatenar o timestamp, a chave privada e a chave pública em uma única string.
// 4. Criar uma função de hash MD5 usando o módulo crypto.
// 5. Alimentar a string concatenada para a função de hash.
// 6. Gerar o hash MD5.
// 7. Retornar o hash MD5.

import * as crypto from 'crypto';
import * as readline from 'readline';
import axios from 'axios';
import { personagemType } from './personagens/types/personagem.type';

function criarHash() {
    // Definir as variáveis
    let privateKey = 'sua_chave_privada';
    let publicKey = 'sua_chave_publica';
    let ts = '1';

    //implemente código que permita ao usuário entrar com a chave privada e a chave pública

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // rl.question('Por favor, insira a chave privada: ', (privateKey) => {
    // rl.question('Por favor, insira a chave pública: ', (publicKey) => {

    publicKey = 'c432a751b03e7d971dbd25da9fa2c8b6'
    privateKey = '4aa06b971cf18468ac2e135c9aa1df61e9f6e148'

    // Concatenar as strings
    let data = ts + privateKey + publicKey;
    console.log('A string concatenada é: ' + data);

    // Criar a função de hash
    let hash = crypto.createHash('md5');

    hash.update(data);

    // Gerar o hash MD5
    let md5 = hash.digest('hex');

    console.log('O hash gerado foi: ' + md5);
    rl.close();

    // });
}

async function postPersonagens(filteredData: personagemType[]) {
    for (let i = 0; i < filteredData.length; i++) {
        try {
            await axios.post('http://localhost:3000/personagens', filteredData[i]);
        } catch (error: any) { 
            if (error.code === 'ECONNRESET') {
                console.log('ECONNRESET, tentando novamente');
                await new Promise(resolve => setTimeout(resolve, 2000)); // espera 5 segundos
                i--; // tenta a mesma requisição novamente
            } else {
                console.error(error);
            }
        }
    }
}

async function getSeries() {

    let url = 'http://gateway.marvel.com/v1/public/series/926/characters?ts=1&apikey=c432a751b03e7d971dbd25da9fa2c8b6&hash=2ac066b5665be17ab51f3df391d2a9ce';
    let response = await axios.get(url);
    let data = response.data.data;

    let filteredData = data.results.map((character: personagemType) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            resourceURL: '',
            quadrinhos: [],
            series: []
        };
    });

    for (let index = 0; index < data.results.length; index++) {
        filteredData[index].resourceURL = data.results[index].resourceURI;
    }

    for (let index = 0; index < filteredData.length; index++) {

        url = 'http://gateway.marvel.com/v1/public/characters/' + filteredData[index].id + '/comics?limit=100&ts=1&apikey=c432a751b03e7d971dbd25da9fa2c8b6&hash=2ac066b5665be17ab51f3df391d2a9ce';
        response = await axios.get(url);
        data = response.data.data;

        let aux = 0;
        let offset = ''

        while (filteredData[index].quadrinhos.length < data.total) {
            
            for (let i=0 ; i < data.results.length ; i++) {
                filteredData[index].quadrinhos.push({ titulo: data.results[i].title });
            }
            if (filteredData[index].quadrinhos.length < data.total) {
                aux += 100; offset = '&offset=';
                offset += aux;
                response = await axios.get(url+offset);
                data = response.data.data;
            }
        }
    }

    for (let index = 0; index < filteredData.length; index++) {

        url = 'http://gateway.marvel.com/v1/public/characters/' + filteredData[index].id + '/series?limit=100&ts=1&apikey=c432a751b03e7d971dbd25da9fa2c8b6&hash=2ac066b5665be17ab51f3df391d2a9ce';
        response = await axios.get(url);
        data = response.data.data;

        let aux = 0;
        let offset = ''

        while (filteredData[index].series.length < data.total) {
            
            for (let i=0 ; i < data.results.length ; i++) {
                filteredData[index].series.push({ titulo: data.results[i].title });
            }
            if (filteredData[index].series.length < data.total) {
                aux += 100; offset = '&offset=';
                offset += aux;
                response = await axios.get(url+offset);
                data = response.data.data;
            }
        }
    }
    
    getPersonagens();
    postPersonagens(filteredData);

    getQuadrinhos();
    postQuadrinhos(filteredData);

    getCriadores();
    postCriadores(filteredData);

    // url = 'http://gateway.marvel.com/v1/public/series/926/comics?limit=50ts=1&apikey=c432a751b03e7d971dbd25da9fa2c8b6&hash=2ac066b5665be17ab51f3df391d2a9ce';
    // response = await axios.get(url);
    // data = response.data;
    // console.log(data.data.results);

    // url = 'http://gateway.marvel.com/v1/public/series/926/creators?ts=1&apikey=c432a751b03e7d971dbd25da9fa2c8b6&hash=2ac066b5665be17ab51f3df391d2a9ce';
    // response = await axios.get(url);
    // data = response.data;
    // console.log(data.data.results);

}

export { getSeries };
export { criarHash };