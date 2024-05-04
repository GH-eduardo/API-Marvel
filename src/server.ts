import app from './app'
import { criarHash, getSeries } from './requisicoes-marvel'

function main() {
    app.listen(3000, 'localhost', () => {
        console.log("Servidor rodando")
    })
}

main()
getSeries()
// criarHash()