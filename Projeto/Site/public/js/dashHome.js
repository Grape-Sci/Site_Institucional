
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

