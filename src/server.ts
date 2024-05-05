import app from './app'
import { inicializarBanco } from './inicializarBanco'

function main() {
    app.listen(3000, 'localhost', () => {
        console.log("Servidor rodando")
    })
}

main()
inicializarBanco()
// criarHash()