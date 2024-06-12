
var qtdTalhoesSeguro = 0;
var qtdTalhoesPerigo = 0;
var qtdTalhoesAlerta = 0;

var listaTempTalhao = [];
var listaUmiTalhao = []
async function listarTalhoes() {
    var idPlantacao = sessionStorage.PLANTACAO_ATUAL;
    var idMocked = sessionStorage.ID_MOCADO_PLANTACAO;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    if (idPlantacao == null || idPlantacao == "" || idPlantacao == undefined) {
        await session_carregar(idEmpresa);
        idPlantacao = sessionStorage.PLANTACAO_ATUAL;
        idMocked = sessionStorage.ID_MOCADO_PLANTACAO;
    }

    await listarPlantacaoKPI(idPlantacao);

    tituloPlant.innerHTML = `Plantação ${idMocked}`;

    await fetch(`/dashPlantacao/listarTalhoes/${idPlantacao}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then(async (talhoes) => {
                if (talhoes.length > 0) {
                    listaTalhao.innerHTML = "";

                    for (var index = 0; index < talhoes.length; index++) {
                        var talhaoAtual = talhoes[index];
                        console.log(talhaoAtual);
                        await capturarDadosTalhoes(talhaoAtual.idTalhao);

                        var situacao = '';
                        var situacaoUmi = '';
                        var situacaoTemp = '';
                        var umidade = listaUmiTalhao[index];
                        var temperatura = listaTempTalhao[index];

                        if (temperatura < talhaoAtual.tempMax - 1 && temperatura > talhaoAtual.tempMin + 1) {
                            situacaoTemp = 'Seguro';
                        } else if (temperatura > talhaoAtual.tempMax || temperatura < talhaoAtual.tempMin) {
                            situacaoTemp = 'Perigo';
                        } else if ((temperatura >= talhaoAtual.tempMin && temperatura <= talhaoAtual.tempMin + 1) ||
                            (temperatura <= talhaoAtual.tempMax && temperatura >= talhaoAtual.tempMax - 1)) {
                            situacaoTemp = 'Alerta';
                        } else {
                            situacao = "Sem Dados";
                        }

                        if (umidade > talhaoAtual.umiMin + 1 && umidade < talhaoAtual.umiMax - 1) {
                            situacaoUmi = 'Seguro';
                        } else if (umidade < talhaoAtual.umiMin || umidade > talhaoAtual.umiMax) {
                            situacaoUmi = 'Perigo';
                        } else if ((umidade >= talhaoAtual.umiMin && umidade <= talhaoAtual.umiMin + 1) ||
                            (umidade <= talhaoAtual.umiMax && umidade >= talhaoAtual.umiMax - 1)) {
                            situacaoUmi = 'Alerta';
                        } else {
                            situacao = "Sem Dados";
                        }

                        if (situacaoUmi == "Perigo" || situacaoTemp == "Perigo") {
                            situacao = 'Perigo'
                            qtdTalhoesPerigo++;
                        } else if (situacaoTemp == "Alerta" || situacaoUmi == "Alerta") {
                            situacao = 'Alerta'
                            qtdTalhoesAlerta++;
                        } else if (situacaoTemp == "Seguro" && situacaoUmi == "Seguro") {
                            situacao = "Seguro"
                            qtdTalhoesSeguro++;
                        }

                        listaTalhao.innerHTML += ` 
                    <div class="card">
                        <div class="nomeTalhao">
                            <h1>Talhão ${index + 1}</span></h1>
                            <h2>${talhaoAtual.nomeTipo}</h2>
                        </div>
                        <div class="infoTalhoes">
                            <div class="info">
                                <h1>Situação</h1>
                                <div class="situacao">
                                    <span class="${situacao}">${situacao}</span>
                                    ${situacao == "Sem Dados" ? "" : `<img src="img/${situacao}.png">`}
                                </div>
                            </div>
                            <div class="info">
                                <h1>Temperatura</h1>
                                <div class="situacao">
                                    <span class="${situacaoTemp}">${temperatura == "Sem Dados" ? temperatura : temperatura + "C°"}</span>
                                </div>
                            </div>
                            <div class="info">
                                <h1>Umidade</h1>
                                <div class="situacao">
                                    <span class="${situacaoUmi}">${umidade == "Sem Dados" ? umidade : umidade + "%"}</span>
                                </div>
                            </div>
                        </div>
                        <div class="botaoTalhao">
                            <button onclick="analisar(${talhaoAtual.idTalhao})">Analisar</button>
                        </div>
                    </div>`;
                    }
                    qtdSeguro.innerHTML = `${qtdTalhoesSeguro}`
                    qtdAlerta.innerHTML = `${qtdTalhoesAlerta}`
                    qtdPerigo.innerHTML = `${qtdTalhoesPerigo}`

                } else {
                    listaTalhao.innerHTML = "Sem Talhões cadastrados"
                }
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            listaTalhao.innerHTML = "<h1>Sem Talhões cadastrados</h1>"
            qtdSeguro.innerHTML = `${qtdTalhoesSeguro}`
            qtdAlerta.innerHTML = `${qtdTalhoesAlerta}`
            qtdPerigo.innerHTML = `${qtdTalhoesPerigo}`
        });
}

async function listarPlantacaoKPI(idPlantacao) {
    await fetch(`/dashPlantacao/listarPlantacoesKPI/${idPlantacao}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then((kpiPlant) => {
                console.log(idPlantacao);
                console.log(kpiPlant)

                AreaPlantada.innerHTML = `<span>${kpiPlant[0].area} hectáres</span>`;
                qtdTalhoes.innerHTML = `<span>${kpiPlant[0].quantidade}</span>`;
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

async function session_carregar(idEmpresa) {
    await fetch(`dashPlantacao/capturar_primeira_plantacoes/${idEmpresa}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then((idPlantacao) => {
                sessionStorage.PLANTACAO_ATUAL = idPlantacao[0].idPlantacao;
                sessionStorage.ID_MOCADO_PLANTACAO = 1;

            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}


async function capturarDadosTalhoes(idTalhao) {
    await fetch(`dashPlantacao/capturarDadosTalhoes/${idTalhao}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then((dadosTalhao) => {
                console.log(dadosTalhao)


                var dados = dadosTalhao[0]

                listaUmiTalhao.push(dados.consultaUmi);
                listaTempTalhao.push(dados.consultaTemp);

            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            listaTempTalhao.push("Sem Dados")
            listaUmiTalhao.push("Sem Dados")
        });
}
