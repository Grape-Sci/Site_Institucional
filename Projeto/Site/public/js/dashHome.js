function cadastrarPlantacao(areaVar) {
    console.log("areaVar", areaVar)
    fetch(`/dashHome/cadastrarPlantacao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
                    await mostrarSituacaoTalhaoPerigo(plantacaoAtual.idPlantacao)
                    await mostrarSituacaoTalhaoAlerta(plantacaoAtual.idPlantacao)

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
                            <span class="seguro">${contSeguro[i]}</span>
                            </div>
                            <div class="cardMetrica">
                            <h3>Alerta</h3>
                            <span class="alerta">${contAlerta[i]}</span>
                            </div>
                            <div class="cardMetrica">
                            <h3>Perigo</h3>
                            <span class="perigo">${contPerigo[i]}</span>
                            </div>
                            </div>
                            </div>
                            <div class="botaoPlantacoes">
                            <button onclick="monitorar(${plantacaoAtual.idPlantacao}, ${i + 1})">Monitorar</button>
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

var contSeguro = [];
var contPerigo = [];
var contAlerta = [];

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


async function mostrarSituacaoTalhaoPerigo(idPlantacao) {
    await fetch(`/dashHome/mostrarSituacaoTalhaoPerigo/${idPlantacao}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then(async (informacaoTalhaoPerigo) => {
                if (resposta.ok) {
                    contPerigo.push(informacaoTalhaoPerigo[0].perigo)
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

async function mostrarSituacaoTalhaoAlerta(idPlantacao) {
    await fetch(`/dashHome/mostrarSituacaoTalhaoAlerta/${idPlantacao}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then(async (informacaoTalhaoAlerta) => {
                if (resposta.ok) {
                    contAlerta.push(informacaoTalhaoAlerta[0].alerta)
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


function cadastrarTalhao(selectIDVar, selectTipoVar, qtdVar, areaPlantVar, dataVar) {
    fetch(`/dashHome/cadastrarTalhao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            IDselectServer: selectIDVar,
            tipoSelectServer: selectTipoVar,
            qtdServer: qtdVar,
            areaServer: areaPlantVar,
            dataServer: dataVar
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






