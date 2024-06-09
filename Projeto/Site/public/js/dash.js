function sair() {
    window.location = "index.html";
    sessionStorage.ID_EMPRESA = ''
    sessionStorage.ID_MOCADO = ''
    sessionStorage.TALHAO_ATUAL = ''
    sessionStorage.NOME_USUARIO = ''
    sessionStorage.CARGO_USUARIO = ''
    sessionStorage.EMAIL_USUARIO = ''
    sessionStorage.PLANTACAO_ATUAL = ''
}

function monitorar(idPlantacaoSelecionada, idMocado) {
    sessionStorage.PLANTACAO_ATUAL = idPlantacaoSelecionada;
    sessionStorage.ID_MOCADO = idMocado
    window.location = "dashPlantacao.html";
}

// function exibirPlantacao() {
//     var idPlantacao = sessionStorage.PLANTACAO_ATUAL;
//     tituloPlantacao.innerHTML = `Plantação ${idPlantacao}`
// }

function analisar(idTalhaoSelecionado) {
    sessionStorage.TALHAO_ATUAL = idTalhaoSelecionado;
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
                            <span id="seguro">${contSeguro[i]}</span>
                            </div>
                            <div class="cardMetrica">
                            <h3>Alerta</h3>
                            <span id="alerta">${contAlerta[i]}</span>
                            </div>
                            <div class="cardMetrica">
                            <h3>Perigo</h3>
                            <span id="perigo">${contPerigo[i]}</span>
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


var qtdTalhoesSeguro = 0
var qtdTalhoesPerigo = 0
var qtdTalhoesAlerta = 0
function listarTalhoes() {
    var idPlantacao = sessionStorage.PLANTACAO_ATUAL;
    var idMocked = sessionStorage.ID_MOCADO;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    if (idPlantacao == null) {
        session_carregar()
    }


    tituloPlant.innerHTML = `Plantação ${idMocked}`

    fetch(`/dashPlantacao/listarTalhoes/${idPlantacao}/${idEmpresa}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((talhoes) => {
                if (talhoes.length > 0) {
                    listaTalhao.innerHTML = ""

                    for (var index = 0; index < talhoes.length; index++) {
                        var talhaoatual = talhoes[index];
                        console.log(talhaoatual)
                        var situacao = ''
                        var situacaoUmi = '';
                        var situacaoTemp = ''
                

                            if(talhaoatual.consultaTemp <= talhaoatual.tempMax - 2 && talhaoatual.consultaTemp >= talhaoatual.tempMin + 2){
                                situacao = 'Seguro'
                                situacaoTemp = 'Seguro'
                                
                            }else if(talhaoatual.consultaTemp >= talhaoatual.tempMax - 2 && talhaoatual.consultaTemp <= talhaoatual.tempMin + 2){
                                situacao = 'Perigo'
                                situacaoTemp = 'Perigo'
                            } else {
                                situacao = 'Alerta'
                                situacaoTemp = 'Alerta'
                            }
                               
                            
                            if(talhaoatual.consultaUmi >= talhaoatual.umiMin + 1 && talhaoatual.consultaUmi <= talhaoatual.umiMax - 1){
                                situacao = 'Seguro'
                                situacaoUmi = 'Seguro'
                                qtdTalhoesSeguro++
                            } else if(talhaoatual.consultaUmi <= talhaoatual.umiMin + 1 && talhaoatual.consultaUmi >= talhaoatual.umiMax - 1){
                                situacao = 'Perigo'
                                situacaoUmi = 'Perigo'
                                qtdTalhoesPerigo++
                            } else {
                                situacao = 'Alerta'
                                situacaoUmi = 'Alerta'
                                qtdTalhoesAlerta++
                            }
                        

                        listaTalhao.innerHTML += ` 
                        <div class="card">
                        <div class="nomeTalhao">
                          <h1>Talhão ${index + 1}</span></h1>
                          <h2>${talhaoatual.nomeTipo}</h2>
                        </div>
                        <div class="infoTalhoes">
                          <div class="info">
                            <h1>Situação</h1>
                            <div class="situacao">
                              <span id="${situacao}"  >${situacao}</span>
                              <img src="img/${situacao}.png">
                            </div>
                          </div>
                          <div class="info">
                            <h1>Temperatura</h1>
                            <div class="situacao">
                              <span id="${situacaoTemp}">${talhaoatual.consultaTemp} Cº</span>
                            </div>
                          </div>
                          <div class="info">
                            <h1>Umidade</h1>
                            <div class="situacao">
                              <span id="${situacaoUmi}">${talhaoatual.consultaUmi} %</span>
                            </div>
                          </div>
                        </div>
                        <div class="botaoTalhao">
                          <button onclick="analisar()">Analisar</button>
                        </div>
                      </div>`

                        //     fetch(`/dashPlantacao/listarTalhoesFOR/${talhaoatual.idTalhao}`, {
                        //         method: "GET",
                        //     }) .then(function (resposta) {
                        //         resposta.json().then( (infotalhoes))
                        //     }

                        // )
                    }
                    metricas.innerHTML = `      
                     <div class="metricaPlantacoes">
              <div class="container">
                <h1 style=" margin-bottom: 10px;">Quantidade de Talhões</h1>
                <div class="informacoes">
                  <div class="situacao">
                    <h1>Seguro</h1>
                    <span style="color: green; font-weight: bold; padding: 7px; margin-top:6%" id="seguro">${qtdTalhoesSeguro}</span>
                  </div>
                  <div class="situacao">
                    <h1>Alerta</h1>
                    <span style="color: yellow; font-weight: bold; padding: 7px; margin-top:6%" id="alerta">${qtdTalhoesAlerta}</span>
                  </div>
                  <div class="situacao">
                    <h1>Perigo</h1>
                    <span style="color: red; font-weight: bold; padding: 7px; margin-top:6%"  id="perigo">${qtdTalhoesPerigo}</span>
                  </div>
                </div>
              </div>
            </div>`
                } 
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });



function listarPlantacaoKPI(idPlantacao) {
    fetch(`/dashPlantacao/listarPlantacoesKPI/${idPlantacao}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((kpiPlant) => {
                if (kpiPlant[0].Area != null) {
                    AreaPlantada.innerHTML = `<span>${kpiPlant[0].Area} hectáres</span`
                    qtdTalhoes.innerHTML = `<span>${kpiPlant[0].quantidade}</span>`

                } else {
                    listaTalhao.innerHTML = `<h1>Sem Talhões Cadastrados`
                    AreaPlantada.innerHTML = `<span>0 hectáres</span>`
                    qtdTalhoes.innerHTML = `<span>0</span>`
                }

            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function session_carregar() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    fetch(`dashPlantacao/capturar_primeira_plantacoes/${idEmpresa}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((idPlantacao) => {
                sessionStorage.PLANTACAO_ATUAL = idPlantacao[0].idPlantacao;
                sessionStorage.ID_MOCADO = 1
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
}