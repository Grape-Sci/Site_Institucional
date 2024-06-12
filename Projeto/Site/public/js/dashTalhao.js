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
                metricasTalhaoTemp.innerHTML = `Entre ${infoTalhao[0].tempMin}  C° e ${infoTalhao[0].tempMax} C°`
                metricasTalhaoUmi.innerHTML = `Entre ${infoTalhao[0].umiMin} % e ${infoTalhao[0].umiMax} %`

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

                situacaoTalhao.innerHTML = `${situacao}`
                situacaoTalhao.className = "";
                situacaoTalhao.classList.add(situacao);

                imagemSituacao.src = `img/${situacao}.png`

                minimaTemp24hrs.innerHTML = `Mínima:${MinTemp} C°`;
                maximaTemp24hrs.innerHTML = `Máxima:${MaxTemp} C°`;
                minimaUmi24hrs.innerHTML = `Mínima:${MinUmi} %`;
                maximaUmi24hrs.innerHTML = `Máxima:${MaxUmi} %`;
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}


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

async function capturarDadosGrafico(idTalhaoSelecionado){
    await fetch(`/dashTalhao/capturarDadosGrafico/${idTalhaoSelecionado}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then((dadosGrafico) => {
            
               console.log(dadosGrafico)
     
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        }); 
}

const labels = [
    '12:00',
    '12:01',
    '12:02',
    '12:03',
    '12:04',
    '12:05',
];

const labels2 = [
    '12:00',
    '12:01',
    '12:02',
    '12:03',
    '12:04',
    '12:05',
];

// Definindo os dados para o gráfico de temperatura em tempo real
const data = {
    labels: labels,
    datasets: [{
        label: 'Temperatura em tempo real',
        backgroundColor: '#FF2D00',
        borderColor: '#FF2D00',
        data: [24, 23, 22, 22, 21, 22], // Dados de temperatura
    }]
};

// Definindo os dados para o gráfico de umidade em tempo real
const data2 = {
    labels: labels2,
    datasets: [{
        label: 'Umidade em tempo real',
        backgroundColor: '#009BFF',
        borderColor: '#009BFF',
        data: [55, 53, 58, 57, 54, 56], // Dados de umidade
    }]
};

// Configurações para o gráfico de temperatura em tempo real
const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            legend: {
                labels: {
                    color: 'black' // Cor das labels da legenda
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'black' // Cor das labels do eixo X
                }
            },
            y: {
                ticks: {
                    color: 'black' // Cor das labels do eixo Y
                }
            }
        }
    }
};

// Configurações para o gráfico de umidade em tempo real
const config2 = {
    type: 'line',
    data: data2,
    options: {
        plugins: {
            legend: {
                labels: {
                    color: 'black' // Cor das labels da legenda
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'black' // Cor das labels do eixo X
                }
            },
            y: {
                ticks: {
                    color: 'black' // Cor das labels do eixo Y
                }
            }
        }
    }
};

// Criando a instância do gráfico de temperatura em tempo real
const myChart = new Chart(
    document.getElementById('myChart').getContext('2d'), // ID do elemento HTML onde o gráfico será renderizado
    config // Configurações do gráfico
);

// Criando a instância do gráfico de umidade em tempo real
const myChart2 = new Chart(
    document.getElementById('myChart2').getContext('2d'), // ID do elemento HTML onde o gráfico será renderizado
    config2 // Configurações do gráfico
);

// Configurando o fundo branco para o canvas
document.getElementById('myChart').style.backgroundColor = 'white';
document.getElementById('myChart2').style.backgroundColor = 'white';
