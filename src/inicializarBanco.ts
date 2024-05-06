import axios from 'axios';
import { personagemType } from './personagens/types/personagem.type';
import { quadrinhoType } from './quadrinhos/types/quadrinho.type';
import { criadorType } from './criadores/types/criador.type';

async function postPersonagens(filteredData: personagemType[]) {
    for (let i = 0; i < filteredData.length; i++) {
        try {
            await axios.post('http://localhost:3000/personagens', filteredData[i]);
        } catch (error: any) { 
            if (error.code === 'ECONNRESET') {
                console.log('ECONNRESET, tentando novamente');
                await new Promise(resolve => setTimeout(resolve, 1000)); // espera 0.5 segundos
                i--; // tenta a mesma requisição novamente
            } else {
                console.error(error);
            }
        }
    }
}

async function getPersonagens() {

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
    return filteredData;
}

async function postQuadrinhos(filteredData: quadrinhoType[]) {
    for (let i = 0; i < filteredData.length; i++) {
        try {
            await axios.post('http://localhost:3000/quadrinhos', filteredData[i]);
        } catch (error: any) { 
            if (error.code === 'ECONNRESET') {
                console.log('ECONNRESET, tentando novamente');
                await new Promise(resolve => setTimeout(resolve, 1000)); // espera 0.5 segundos
                i--; // tenta a mesma requisição novamente
            } else {
                console.error(error);
            }
        }
    }
}

async function getQuadrinhos() { 

    let url = 'http://gateway.marvel.com/v1/public/series/926/comics?limit=100&ts=1&apikey=c432a751b03e7d971dbd25da9fa2c8b6&hash=2ac066b5665be17ab51f3df391d2a9ce';
    let response = await axios.get(url);
    let data = response.data.data;

    let filteredData = data.results.map((comic: quadrinhoType) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            publication_date: '',
            cover: '',
            quantidadeDePaginas: 0,
            criadores: [],
            personagens: []
        };
    });

    for (let index = 0; index < data.results.length; index++) {
        filteredData[index].publication_date = data.results[index].dates.find((dateObj: any) => dateObj.type === 'onsaleDate').date;
        filteredData[index].cover = data.results[index].resourceURI;
        filteredData[index].quantidadeDePaginas = data.results[index].pageCount;
    }

    for (let index = 0; index < filteredData.length; index++) {

        url = 'http://gateway.marvel.com/v1/public/comics/' + filteredData[index].id + '/creators?limit=100&ts=1&apikey=c432a751b03e7d971dbd25da9fa2c8b6&hash=2ac066b5665be17ab51f3df391d2a9ce';
        response = await axios.get(url);
        data = response.data.data;

        let aux = 0;
        let offset = ''

        while (filteredData[index].criadores.length < data.total) {
            
            for (let i=0 ; i < data.results.length ; i++) {
                filteredData[index].criadores.push({ creators: data.results[i].fullName });
            }
            if (filteredData[index].criadores.length < data.total) {
                aux += 100; offset = '&offset=';
                offset += aux;
                response = await axios.get(url+offset);
                data = response.data.data;
            }
        }
    }
    for (let index = 0; index < filteredData.length; index++) {

        url = 'http://gateway.marvel.com/v1/public/comics/' + filteredData[index].id + '/characters?limit=100&ts=1&apikey=c432a751b03e7d971dbd25da9fa2c8b6&hash=2ac066b5665be17ab51f3df391d2a9ce';
        response = await axios.get(url);
        data = response.data.data;

        let aux = 0;
        let offset = ''

        while (filteredData[index].personagens.length < data.total) {
            
            for (let i=0 ; i < data.results.length ; i++) {
                filteredData[index].personagens.push({ characters: data.results[i].name });
            }
            if (filteredData[index].personagens.length < data.total) {
                aux += 100; offset = '&offset=';
                offset += aux;
                response = await axios.get(url+offset);
                data = response.data.data;
            }
        }
    }
    return filteredData;
}

async function postCriadores(filteredData: criadorType[]) {
    for (let i = 0; i < filteredData.length; i++) {
        try {
            await axios.post('http://localhost:3000/criadores', filteredData[i]);
        } catch (error: any) { 
            if (error.code === 'ECONNRESET') {
                console.log('ECONNRESET, tentando novamente');
                await new Promise(resolve => setTimeout(resolve, 500)); // espera 0.5 segundos
                i--; // tenta a mesma requisição novamente
            } else {
                console.error(error);
            }
        }
    }
}

async function getCriadores() {

    let url = 'http://gateway.marvel.com/v1/public/series/926?ts=1&apikey=c432a751b03e7d971dbd25da9fa2c8b6&hash=2ac066b5665be17ab51f3df391d2a9ce';
    let response = await axios.get(url);
    let data = response.data.data;

    let filteredData = data.results[0].creators.items.map((creator: criadorType) => {
        return {
            name: creator.name,
            role: creator.role,
        };
    });

    for (let index = 0; index < 20; index++) {
        filteredData[index].resourceURL = data.results[0].creators.items[index].resourceURI;
    }

    return filteredData;
}

async function inicializarBanco() {

    let personagensData: personagemType[] = await getPersonagens();
    postPersonagens(personagensData);

    let quadrinhosData: quadrinhoType[] = await getQuadrinhos();
    postQuadrinhos(quadrinhosData);

    let criadoresData: criadorType[] = await getCriadores();
    postCriadores(criadoresData);

    console.log('Dados importados!');
}

export { inicializarBanco };