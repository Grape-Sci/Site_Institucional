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
                                        <span id="seguro${i}">${contSeguro}</span>
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
var contSeguro = 0;

function mostrarSituacaoTalhaoIdeal(idPlantacao) {
    contSeguro = 0;
    fetch(`/dashHome/mostrarSituacaoTalhaoIdeal/${idPlantacao}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((informacaoTalhaoIdeal) => {
                if (resposta.ok) {
                    for(var i = 0; i < informacaoTalhaoIdeal.length; i++){
                        contSeguro = informacaoTalhaoIdeal[i].seguro
                    }
                }
                else {
                    new Error("Não foi possível achar talhões")
                }
            });
        })


        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}