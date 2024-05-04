// 1. Importar o módulo crypto do Node.js, que fornece funcionalidades criptográficas.
// 2. Definir as variáveis para a chave privada, chave pública e timestamp.
// 3. Concatenar o timestamp, a chave privada e a chave pública em uma única string.
// 4. Criar uma função de hash MD5 usando o módulo crypto.
// 5. Alimentar a string concatenada para a função de hash.
// 6. Gerar o hash MD5.
// 7. Retornar o hash MD5.

import * as crypto from 'crypto';
import * as readline from 'readline';

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
    // });
}

export { criarHash };