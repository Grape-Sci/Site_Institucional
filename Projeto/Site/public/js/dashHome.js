
function listarPlantacoes() {
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/dashHome/listarPlantacoes/${idEmpresa}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((plantacoes) => {
                for (var i = 0; i < plantacoes.length; i++) {
                    var plantacaoAtual = plantacoes[i];
                    mostrarSituacaoTalhaoIdeal(plantacaoAtual.idPlantacao)

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

function mostrarSituacaoTalhaoIdeal(idPlantacao) {
    fetch(`/dashHome/mostrarSituacaoTalhaoIdeal/${idPlantacao}`, {
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