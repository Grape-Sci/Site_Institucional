async function capturarKPITalhao() {
    var idTalhaoSelecionado = sessionStorage.TALHAO_ATUAL;

    var situacao = "";
    var situacaoTemp = "";
    var situacaoUmi = "";

    await capturarSituacao(idTalhaoSelecionado);
    await capturarDadosUltimas(idTalhaoSelecionado);

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
                console.log(registros24hrs)
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