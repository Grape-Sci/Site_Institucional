async function capturarKPITalhao() {
    var idTalhaoSelecionado = sessionStorage.TALHAO_ATUAL;

    var situacao = "";
    var situacaoTemp = "";
    var situacaoUmi = "";

    await capturarSituacao(idTalhaoSelecionado);
    await capturarDadosUltimas(idTalhaoSelecionado);
    await capturarDadosGrafico(idTalhaoSelecionado)

    fetch(`/dashTalhao/capturar_kpiTalhao/${idTalhaoSelecionado}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((infoTalhao) => {
                tipoUvaTalhao.innerHTML = infoTalhao[0].nomeTipo;
                metricasTalhaoTemp.innerHTML = `<b>Entre ${infoTalhao[0].tempMin}  C° e ${infoTalhao[0].tempMax} C°</b>`
                metricasTalhaoUmi.innerHTML = `<b>Entre ${infoTalhao[0].umiMin} % e ${infoTalhao[0].umiMax} %</b>`
                
                tempMinPerigoTalhao.innerHTML = `${infoTalhao[0].tempMin} C° <`
                umiMinPerigoTalhao.innerHTML = `${infoTalhao[0].umiMin} % <`

                tempMinAlertaTalhao.innerHTML = `${infoTalhao[0].tempMin + 2} C°  <`
                umiMinAlertaTalhao.innerHTML = `${infoTalhao[0].umiMin + 2} % <`

                tempSeguroTalhao.innerHTML = `${((infoTalhao[0].tempMin + infoTalhao[0].tempMax) / 2).toFixed()} C°`
                umiSeguroTalhao.innerHTML = `${((infoTalhao[0].umiMin + infoTalhao[0].umiMax) / 2).toFixed()} %`

                tempMaxAlertaTalhao.innerHTML = ` > ${infoTalhao[0].tempMax - 1} C°`
                umiMaxAlertaTalhao.innerHTML = ` > ${infoTalhao[0].umiMax - 1} % `

                tempMaxPerigoTalhao.innerHTML = `> ${infoTalhao[0].tempMax} C°`
                umiMaxPerigoTalhao.innerHTML = `> ${infoTalhao[0].umiMax} %`

                dias.innerHTML = `${infoTalhao[0].prevColheita} dias`

                if (ultimaTemp < infoTalhao[0].tempMax - 1 && ultimaTemp > infoTalhao[0].tempMin + 1) {
                    situacaoTemp = 'Seguro';
                } else if (ultimaTemp > infoTalhao[0].tempMax || ultimaTemp < infoTalhao[0].tempMin) {
                    situacaoTemp = 'Perigo';
                } else if ((ultimaTemp >= infoTalhao[0].tempMin && ultimaTemp <= infoTalhao[0].tempMin + 1) ||
                    (ultimaTemp <= infoTalhao[0].tempMax && ultimaTemp >= infoTalhao[0].tempMax - 1)) {
                    situacaoTemp = 'Alerta';
                } else {
                    situacao = "Sem Dados";
                }

                if (ultimaUmi > infoTalhao[0].umiMin + 1 && ultimaUmi < infoTalhao[0].umiMax - 1) {
                    situacaoUmi = 'Seguro';
                } else if (ultimaUmi < infoTalhao[0].umiMin || ultimaUmi > infoTalhao[0].umiMax) {
                    situacaoUmi = 'Perigo';
                } else if ((ultimaUmi >= infoTalhao[0].umiMin && ultimaUmi <= infoTalhao[0].umiMin + 1) ||
                    (ultimaUmi <= infoTalhao[0].umiMax && ultimaUmi >= infoTalhao[0].umiMax - 1)) {
                    situacaoUmi = 'Alerta';
                } else {
                    situacao = "Sem Dados";
                }

                if (situacaoUmi == "Perigo" || situacaoTemp == "Perigo") {
                    situacao = 'Perigo'
                } else if (situacaoTemp == "Alerta" || situacaoUmi == "Alerta") {
                    situacao = 'Alerta'
                } else if (situacaoTemp == "Seguro" && situacaoUmi == "Seguro") {
                    situacao = "Seguro"
                }

                var situacaoTalhao = document.getElementById("situacaoTalhao");

                situacaoTalhao.innerHTML = `<b>${situacao}</b>`
                situacaoTalhao.className = "";
                situacaoTalhao.classList.add(situacao);

                imagemSituacao.src = `img/${situacao}.png`
                imagemSituacao.style.width = `${30}px`;
                imagemSituacao.style.height = `${30}px`;

                minimaTemp24hrs.innerHTML = `<b>Mínima:${MinTemp} C°</b>`;
                maximaTemp24hrs.innerHTML = `<b>Máxima:${MaxTemp} C°</b>`;
                minimaUmi24hrs.innerHTML = `<b>Mínima:${MinUmi} %</b>`;
                maximaUmi24hrs.innerHTML = `<b>Máxima:${MaxUmi} %</b>`;
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

setInterval(() => capturarKPITalhao(), 2000);


var ultimaTemp;
var ultimaUmi;

async function capturarSituacao(idTalhaoSelecionado) {
    await fetch(`/dashTalhao/capturarSituacao/${idTalhaoSelecionado}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then((infoTalhao) => {
                ultimaTemp = infoTalhao[0].consultaTemp;
                ultimaUmi = infoTalhao[0].consultaUmi;
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

var MaxTemp;
var MinTemp;
var MaxUmi;
var MinUmi;

var consultaTemp;
var consultaUmi;
var registroDt;


async function capturarDadosUltimas(idTalhaoSelecionado) {
    await fetch(`/dashTalhao/capturarDadosUltimas/${idTalhaoSelecionado}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then((registros24hrs) => {

                MaxTemp = registros24hrs[0].MaxTemp;
                MaxUmi = registros24hrs[0].MaxUmi;
                MinUmi = registros24hrs[0].MinUmi;
                MinTemp = registros24hrs[0].MinTemp;

            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

async function capturarDadosGrafico(idTalhaoSelecionado) {
    await fetch(`/dashTalhao/capturarDadosGrafico/${idTalhaoSelecionado}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then((dadosGrafico) => {

                consultaTemp = dadosGrafico[0].consultaTemp;
                consultaUmi = dadosGrafico[0].consultaUmi;
                registroDt = dadosGrafico[0].registroDt;
                plotarGraficoTemp(dadosGrafico, idTalhaoSelecionado)
                plotarGraficoUmi(dadosGrafico, idTalhaoSelecionado)
                console.log(consultaTemp)
                console.log(consultaUmi)
                console.log(registroDt)
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

document.getElementById('myChart').style.backgroundColor = 'white';
document.getElementById('myChart2').style.backgroundColor = 'white';

function plotarGraficoTemp(dadosGrafico, idTalhaoSelecionado) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [
            {
                label: 'Temperatura',
                data: [],
                fill: false,
                borderColor: 'rgb(199, 52, 52)',
                tension: 0.1
            }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(dadosGrafico)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < dadosGrafico.length; i++) {
        var registro = dadosGrafico[i];
        var dataAtualizada = new Date(registro.registroDt)
        labels.push(dataAtualizada.toLocaleString());
        dados.datasets[0].data.push(registro.consultaTemp);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChart`),
        config
    );

    setTimeout(() => atualizarGraficoTemp(idTalhaoSelecionado, dados, myChart), 2000);
}

function plotarGraficoUmi(dadosGrafico, idTalhaoSelecionado) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(dadosGrafico)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < dadosGrafico.length; i++) {
        var registro = dadosGrafico[i];
        var dataAtualizada = new Date(registro.registroDt)
        labels.push(dataAtualizada.toLocaleString());
        dados.datasets[0].data.push(registro.consultaUmi);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChart2`),
        config
    );

    setTimeout(() => atualizarGraficoUmi(idTalhaoSelecionado, dados, myChart), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGraficoTemp(idTalhaoSelecionado, dados, myChart) {



    fetch(`/dashTalhao/capturarDadosGrafico/${idTalhaoSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, idAquario);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);



                if (novoRegistro[0].registroDt == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].registroDt)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    var dataAtualizada = new Date(novoRegistro[0].registroDt)
                    dados.labels.push(dataAtualizada.toLocaleString()); // incluir um novo momento

                    // dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    // dados.datasets[0].data.push(novoRegistro[0].consultaUmi); // incluir uma nova medida de umidade

                    dados.datasets[0].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[0].data.push(novoRegistro[0].consultaTemp); // incluir uma nova medida de temperatura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoTemp(idTalhaoSelecionado, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoTemp(idTalhaoSelecionado, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function atualizarGraficoUmi(idTalhaoSelecionado, dados, myChart) {



    fetch(`/dashTalhao/capturarDadosGrafico/${idTalhaoSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, idAquario);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);



                if (novoRegistro[0].registroDt == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].registroDt)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    var dataAtualizada = new Date(novoRegistro[0].registroDt)
                    dados.labels.push(dataAtualizada.toLocaleString())// incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].consultaUmi); // incluir uma nova medida de umidade

                    // dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    // dados.datasets[1].data.push(novoRegistro[0].consultaTemp); // incluir uma nova medida de temperatura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoUmi(idTalhaoSelecionado, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoUmi(idTalhaoSelecionado, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}
