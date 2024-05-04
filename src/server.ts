import app from './app'
import { criarHash } from './requisicao'

function main() {
    app.listen(3000, 'localhost', () => {
        console.log("Servidor rodando")
    })
}

main()
// criarHash()