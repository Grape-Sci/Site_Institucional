// Constante para importar os modulos que a aplicação precisa para rodar 
const serialport = require('serialport'); // Módulo para comunicação serial
const express = require('express'); // Módulo para criar um servidor web
const mysql = require('mysql2'); // Módulo para conectar ao MySQL

// Constantes para configurações
// Porta de entrada e saída
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// Habilita ou desabilita a inserção de dados no banco de dados
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// Função para comunicação serial
const serial = async (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    // valoresLuminosidade,
    // valoresLm35Temperatura,
    // valoresChave
) => {
    let poolBancoDados = ''

    // Conexão com o banco de dados MySQL
    poolBancoDados = mysql.createPool(
        {
            // altere!
            // Credenciais do banco de dados
            host: '10.18.33.212',
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'GrapeSci',
            port: 3307
        }
    ).promise();

    // Lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // Configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // Evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // Processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const dht11Umidade = parseFloat(valores[0]);
        const dht11Temperatura = parseFloat(valores[1]);
        // const lm35Temperatura = parseFloat(valores[2]);
        // const luminosidade = parseFloat(valores[3]);
        // const chave = parseInt(valores[4]);

        // Armazena os valores dos sensores nos arrays correspondentes
        valoresDht11Umidade.push(dht11Umidade);
        valoresDht11Temperatura.push(dht11Temperatura);
        // valoresLuminosidade.push(luminosidade);
        // valoresLm35Temperatura.push(lm35Temperatura);
        // valoresChave.push(chave);

        // Insere os dados no banco de dados (se habilitado o true) 
        if (HABILITAR_OPERACAO_INSERIR) {
            for (var i = 1; i <= 6; i++) {
                const fatorTemperatura = Number((Math.random() * (1.8 - 1.25) + 1.25).toFixed(2));
                // const fatorUmidade = Number((Math.random() * (1.05 - 0.95) + 0.95).toFixed(2));;

                // const fatorTemperatura = 1;
                const fatorUmidade = 1;


                var temperaturaAlterada = Number((dht11Temperatura * fatorTemperatura).toFixed(2));
                var umidadeAlterada = Number((dht11Umidade * fatorUmidade).toFixed(2));

                await poolBancoDados.execute(
                    'INSERT INTO Registro (consultaUmi, consultaTemp, registroDt, fkDispositivo) VALUES (?, ?, now(), ?)',
                    [umidadeAlterada, temperaturaAlterada, i]
                );
            }
            console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura)

        }

    });

    // Evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// não altere!
// Função para criar e configurar o servidor web
const servidor = (
    valoresDht11Umidade,
    valoresDht11Temperatura
) => {
    const app = express(); // Importa e instancia o Express.js para criar um servidor

    app.use((request, response, next) => { // Define middleware para habilitar o CORS
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    app.listen(SERVIDOR_PORTA, () => { // Inicia o servidor na porta definida
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // Define endpoints para obter os dados de umidade e temperatura do sensor DHT11
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });
}

(async () => {
    const valoresDht11Umidade = [];
    const valoresDht11Temperatura = [];

    await serial( // Chama uma função chamada "serial" para obter os dados do sensor DHT11
        valoresDht11Umidade,
        valoresDht11Temperatura
    );

    servidor( // Inicia o servidor web com os dados obtidos do sensor
        valoresDht11Umidade,
        valoresDht11Temperatura
    );
})();
