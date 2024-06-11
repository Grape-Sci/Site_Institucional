
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

function cadastrarPlantacao(idVar, areaVar) {
    fetch(`/dashHome/cadastrarPlantacao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idServer: idVar,
            areaServer: areaVar,
            idEmpresaServer: sessionStorage.ID_EMPRESA
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("Cadastro realizado")
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

