# API *Intermediária* da Marvel feita em typescript com node.js, express e MongoDB

## Observações

- **Para inicializar:**
execute no terminal (estando no diretório principal do repositório): 

```
npm install
```
e
```
npm run start
```

- Observe que os "id's" gerados automaticamente pelo MongoDB tem o formato do tipo: *662fb7ba3b32c9665dd04a29*,
- Nas rotas em que houver *':id'* simplesmente **substitua por um id específico** na hora da utilização.
- **Todas** as rotas devem começar com: 

```
http://localhost:3000
```

---
## Entidades:
## Personagens
- **Atributos:** id, nome, descrição, URL da imagem, quadrinhos em que apareceu 
- **Exemplo de corpo para ser utilizado em requisições HTTP do tipo POST e PUT:**
```
{
    "id": 2,
    "name": "super herói bonzão",
    "description": "salva o mundo",
    "resourseURL": "www.heroi.com",
    "quadrinhos": [{
        "titulo": "coleção#2"
    }],
    "series": [{
        "titulo": "saga do surfista prateado"
    }]
}
```

## Quadrinhos
- **Atributos:** id, titulo, descrição, data de publicação, capa, quantidade de páginas, criadores e personagens que aparecem no quadrinho
- **Exemplo de corpo para ser utilizado em requisições HTTP do tipo POST e PUT:**
```
{
    "id": 8,
    "title": "Título bem bacana",
    "description": "seila",
    "publication_date": "2001/01/29",
    "cover": "www.imagem.com",
    "quantidadeDePaginas": 115
    "criadores": [{
        "name": "bento",
    }],
    "personagens": [{
        "name": "surfista prateado",
    }],
}
```

## Criador
- **Atributos:** nome, função e a url de uma foto
- **Exemplo de corpo para ser utilizado em requisições HTTP do tipo POST e PUT:**
```
{
    "name": "Pablo picasso",
    "role": "ilustrator",
    "resourceURL": "www.fotoDoCara.com"
}
```
---
# Rotas:

## Personagem

 **POST**
- Rota para criação de um novo personagem:
```
/personagens
```
 **GET**
- Rota para obter todos os personagens:
```
/personagens
```
- Rota para obter detalhes de um personagem específico:
```
/personagens/:id
```
- Rota para obter todos os quadrinhos em que há aparição de um personagem específico:
```
/personagens/:id/quadrinhos
```
 **PUT**
- Rota para atualizar um personagem existente:
```
/personagens/:id
```
 **DELETE**
- Rota para excluir um personagem: 
```
/personagens/:id
```
---
## Quadrinhos

 **POST**
- Rota para criação de um novo quadrinho:
```
/quadrinhos
```
 **GET**
- Rota para listar todos os quadrinhos da coleção:
```
/quadrinhos
```
- Rota para listar quadrinhos que foram lançados em um determinado período: 
```
/quadrinhos/release-in-period?startDate=2009-01-01&endDate=2010-12-31
```
- Rota para obter detalhes de um quadrinho específico:
```
/quadrinhos/:id
```
- Rota para contar todos os quadrinhos da coleção:
```
/quadrinhos/count
```
- Rota para encontrar o quadrinho que tem mais páginas:
```
/quadrinhos/most-pages
```
- Rota para encontrar o quadrinho que tem menos páginas:
```
/quadrinhos/least-pages
```
 **PUT**
- Rota para atualizar um quadrinho existente:
```
/quadrinhos/:id
```
 **DELETE**
- Rota para excluir um quadrinho:
```
/quadrinhos/:id
```
---
## Criadores

 **POST**
- Rota para criação de um novo criador:
```
/criadores
```
 **GET**
- Rota para listar todos os criadores:
```
/criadores
```
- Rota para obter detalhes de um criador específico:
```
/criadores/:id
```
 **PUT**
- Rota para atualizar um criador existente: 
```
/criadores/:id
```
 **DELETE**
- Rota para excluir um criador:
```
/criadores/:id
```
