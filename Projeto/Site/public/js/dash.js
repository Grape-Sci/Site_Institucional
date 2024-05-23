function sair() {
    window.location = "index.html";
}

function monitorar(idPlantacaoSelecionada) {
    // sessionStorage.PLANTACAO_ATUAL = idPlantacaoSelecionada;
    window.location = "dashPlantacao.html";
}

// function exibirPlantacao() {
//     var idPlantacao = sessionStorage.PLANTACAO_ATUAL;
//     tituloPlantacao.innerHTML = `Plantação ${idPlantacao}`
// }

function analisar(idTalhaoSelecionado) {
    // sessionStorage.TALHAO_ATUAL = idTalhaoSelecionado;
    window.location = "dashTalhao1.html";
}

function analisar2() {
    window.location = "dashTalhao2.html";
}

function analisar3() {
    window.location = "dashTalhao3.html";
}

function exibirUsuario() {
    var nome = sessionStorage.NOME_USUARIO;

    nomeUsuario.innerHTML = `${nome}`;
}

function exibirKPIPlantacao() {
    fetch(`/dashHome/exibirInfoPlantacoes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idEmpresaServer: sessionStorage.ID_EMPRESA,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then((infoPlantacoes) => {
                    areaPlantacao.innerHTML = `${infoPlantacoes[0].somaArea}  hectares`;
                    quantidadePlantacao.innerHTML = `${infoPlantacoes[0].quantidade}`;
                });
            } else {
                throw console.log("Erro ao realizar o select");
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function listarPlantacoes() {
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/dashHome/listarPlantacoes/${idEmpresa}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((plantacoes) => {
                for (var i = 0; i < plantacoes.length; i++) {
                    var plantacaoAtual = plantacoes[i];
                    mostrarSituacaoTalhao(plantacaoAtual.idPlantacao)

                    cardPrincipal.innerHTML +=
                        `<div class="card">
                            <div class="nomePlantacao">
                                <h1>Plantação ${i + 1}</h1>
                            </div>
                            <div class="infoPlantacoes">
                                <h2>Quantidade de Talhões</h2>
                                <div class="info">
                                    <div class="cardMetrica">
                                        <h3>Seguro</h3>
                                        <span id="seguro"></span>
                                    </div>
                                    <div class="cardMetrica">
                                        <h3>Alerta</h3>
                                        <span id="alerta"></span>
                                    </div>
                                    <div class="cardMetrica">
                                        <h3>Perigo</h3>
                                        <span id="perigo"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="botaoPlantacoes">
                                <button onclick="monitorar(${plantacaoAtual.idPlantacao})">Monitorar</button>
                            </div>
                        </div>
                        `
                }
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function mostrarSituacaoTalhao(idPlantacao) {
    fetch(`/dashHome/mostrarSituacaoTalhao/${idPlantacao}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((informacaoTalhao) => {

                var contTalhaoAlerta = 0;
                var contTalhaoPerigo = 0;
                var contTalhaoIdeal = 0;

                for (var i = 0; i < informacaoTalhao.length; i++) {
                    var temperaturaAtual = informacaoTalhao[i].consultaTemp;
                    var umidadeAtual = informacaoTalhao[i].consultaUmi;
                    var tempMax = informacaoTalhao[i].tempMax;
                    var tempMin = informacaoTalhao[i].tempMin;
                    var umiMax = informacaoTalhao[i].umiMax;
                    var umiMin = informacaoTalhao[i].umiMin;

                    if (temperaturaAtual < tempMin || umidadeAtual < umiMin
                        || temperaturaAtual > tempMax || umidadeAtual > umiMax) {
                        contTalhaoPerigo++;
                        perigo.innerHTML = `${contTalhaoPerigo}`
                    }
                    else if (temperaturaAtual < tempMax - 1 || umidadeAtual < umiMax - 1
                        || temperaturaAtual > tempMin + 1 || umidadeAtual > umiMin + 1) {
                        contTalhaoIdeal++;
                    } else {
                        contTalhaoAlerta++;
                    }
                }
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}