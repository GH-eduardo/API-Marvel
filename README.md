# API *Intermediária* da Marvel feita em typescript com node.js, express e MongoDB

- **Para inicializar:**
execute no terminal (estando no diretório principal do repositório): `npm run start:dev`
- Observe que os "id's" gerados automaticamente pelo MongoDB tem o formato do tipo: *662fb7ba3b32c9665dd04a29*,
os id's fornecidos abaixo são apenas para exemplo, você deve substituir por um id específico na hora da utilização.
---
## Entidades:
### User
- **Atributos:** _id, name, weight(peso), email, password
- **Exemplo de corpo para ser utilizado em requisições HTTP do tipo POST e PUT:**
```
{
    "name": "Nome do Usuário",
    "weight": 100,
    "email": "email@email.com",
    "password": "123456"
}
```

### Task
- **Atributos:** _id, title, description, creation_date, conclusion_date, type, category, status(pendente/em andamento/concluída) e author
- **Exemplo de corpo para ser utilizado em requisições HTTP do tipo POST e PUT:**
```
{
    "title": "Título da Tarefa",
    "description": "descrição",
    "category": "662fb7ba3b32c9665dd04a29",
    "type": "profissional",
    "status": "concluída",
    "author": "662fdf6feeeb539f8addd40d"
}
```

### Category
- **Atributos:** _id, name, color(vermelho/verde/azul/amarelo/roxo).
- **Exemplo de corpo para ser utilizado em requisições HTTP do tipo POST e PUT:**
```
{
    "name": "Nome de uma categoria de tarefas",
    "color": "verde"
}
```
---
# Rotas:

## User

### POST
- Rota para criação de um novo usuário: `http://localhost:3000/users`
### GET
- Rota para obter todos os usuários: `http://localhost:3000/users`
- Rota para obter detalhes de um usuário específica: `http://localhost:3000/users/660c3411b974fc26087be5b7`
### PUT
- Rota para atualizar um usuário existente: `http://localhost:3000/users/660c3411b974fc26087be5b7`
### DELETE
- Rota para excluir um usuário: `http://localhost:3000/users/660c3411b974fc26087be5b7`
---
## Task

### POST
- Rota para criação de uma nova tarefa: `http://localhost:3000/tasks`
### GET
- Rota para listar todas as tarefas: `http://localhost:3000/tasks`
- Rota para obter detalhes de uma tarefa específica: `http://localhost:3000/tasks/662fdfdaeeeb539f8addd417`
- Rota para listar todas as tarefas de um usuário: `http://localhost:3000/tasks/user/662fba553b32c9665dd04a32`
- Rota para filtrar tarefas por categoria: `http://localhost:3000/tasks/category/662fb7ba3b32c9665dd04a29`
- Rota para listar tarefas concluídas: `http://localhost:3000/tasks/completed`
- Rota para listar tarefas pendentes: `http://localhost:3000/tasks/pending`
- Rota para listar tarefas que vencem em um determinado período: `http://localhost:3000/tasks/due-in-period?startDate=2024-01-01&endDate=2024-12-31`
- Rota para contar o número total de tarefas de um usuário: `http://localhost:3000/tasks/user/662fdf6feeeb539f8addd40d/count`
- Rota para encontrar a tarefa mais recente de um usuário: `http://localhost:3000/tasks/user/662fdf6feeeb539f8addd40d/most-recent`
- Rota para calcular a média de conclusão das tarefas: `http://localhost:3000/tasks/average-completion`
- Rota para encontrar a tarefa com a descrição mais longa: `http://localhost:3000/tasks/longest-description`
- Rota para agrupar tarefas por categoria: `http://localhost:3000/tasks/group-by-category`
- Rota para encontrar a tarefa mais antiga de um usuário: `http://localhost:3000/tasks/user/662fdf6feeeb539f8addd40d/oldest`
### PUT
- Rota para atualizar uma tarefa existente: `http://localhost:3000/tasks/662fdfb5eeeb539f8addd40f`
### DELETE
- Rota para excluir uma tarefa: `http://localhost:3000/tasks/662fcd4056cfc8879a362e95`
---
## Category

### POST
- Rota para criação de uma nova categoria: `http://localhost:3000/categories`
### GET  
- Rota para listar todas as categorias: `http://localhost:3000/categories`
- Rota para obter detalhes de uma categoria específica: `http://localhost:3000/categories/662fb7ba3b32c9665dd04a29`
- Rota para listar todas as categorias de um usuário: `http://localhost:3000/categories/user/662fdf6feeeb539f8addd40d`
### PUT
- Rota para atualizar uma categoria existente: `http://localhost:3000/categories/662fb7ba3b32c9665dd04a29`
### DELETE
- Rota para excluir uma categoria: `http://localhost:3000/categories/662fb7e43b32c9665dd04a2b`
---
## Demais Observações:
- Uma task sempre vai estar associada a um (e somente um) usuário, portanto não é possível criar uma task antes de haver no mínimo um usuário, por sua vez cada usuário pode ter infinitas tasks
- Uma task pode ou não estar associada a uma categoria, é opcional a task ter uma categoria
- Só podem haver no máximo 5 categorias, das cores: vermelho/verde/azul/amarelo/roxo
- Após deletar algo a base de dados é atualizada automaticamente, por exemplo: se um usuário for deletado todas as tasks dele serão deletadas também e assim por diante...
