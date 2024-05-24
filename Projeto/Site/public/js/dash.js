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
        .then(async function (resposta) {
            await resposta.json().then(async (plantacoes) => {
                for (var i = 0; i < plantacoes.length; i++) {
                    var plantacaoAtual = plantacoes[i];
                    await mostrarSituacaoTalhaoIdeal(plantacaoAtual.idPlantacao)
                    console.table(contSeguro)


                    mostrarPlants(i, contSeguro[i], plantacaoAtual.idPlantacao)


                }
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

var contSeguro = [];

async function mostrarSituacaoTalhaoIdeal(idPlantacao) {
    await fetch(`/dashHome/mostrarSituacaoTalhaoIdeal/${idPlantacao}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then(async (informacaoTalhaoIdeal) => {
                if (resposta.ok) {
                    contSeguro.push(informacaoTalhaoIdeal[0].seguro)
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

function mostrarPlants(contPlant, seguro, idPlantacao) {
    cardPrincipal.innerHTML +=
        `<div class="card">
        <div class="nomePlantacao">
            <h1>Plantação ${contPlant + 1}</h1>
        </div>
        <div class="infoPlantacoes">
            <h2>Quantidade de Talhões</h2>
            <div class="info">
                <div class="cardMetrica">
                    <h3>Seguro</h3>
                    <span id="seguro">${seguro}</span>
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
            <button onclick="monitorar(${idPlantacao})">Monitorar</button>
        </div>
    </div>
    `
}