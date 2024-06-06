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


function listarTalhoes() {
    var idPlantacao = sessionStorage.PLANTACAO_ATUAL;
    var idMocked = sessionStorage.ID_MOCADO; 


    if(idPlantacao == null) {
        session_carregar()
    }

    tituloPlant.innerHTML = `Plantação ${idMocked}`

    fetch(`/dashPlantacao/listarTalhoes/${idPlantacao}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((talhoes) => {
                if(talhoes.length >0){
                    for (var index = 0; index < talhoes.length; index++) {
                        var talhaoatual = talhoes[index];
    
                        capturar_metricas_talhao(talhaoatual.idTalhao)

                        listaTalhao.innerHTML += ` 
                        <div class="card">
                        <div class="nomeTalhao">
                          <h1>Talhão ${index + 1}</span></h1>
                          <h2>Uva Itália</h2>
                        </div>
                        <div class="infoTalhoes">
                          <div class="info">
                            <h1>Situação</h1>
                            <div class="situacao">
                              <span id="seguro">Seguro</span>
                              <img src="img/seguro.png">
                            </div>
                          </div>
                          <div class="info">
                            <h1>Temperatura</h1>
                            <div class="situacao">
                              <span id="seguro">22°C</span>
                            </div>
                          </div>
                          <div class="info">
                            <h1>Umidade</h1>
                            <div class="situacao">
                              <span id="seguro">58%</span>
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
                } else{
                    AreaPlantada.innerHTML = `<span>Plantação sem talhões</span>`
                }
                
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function capturar_metricas_talhao(idTalhao){
    fetch(`/dashPlantacao/listarTalhoesKPI/${idTalhao}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((talhoes) => {
              
              
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        }); 
}

function listarPlantacaoKPI() {
    var idPlantacao = sessionStorage.PLANTACAO_ATUAL;

    fetch(`/dashPlantacao/listarPlantacoesKPI/${idPlantacao}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((kpiPlant) => {
                if(kpiPlant[0].Area != null){
                    AreaPlantada.innerHTML = `<span>${kpiPlant[0].Area} hectáres</span`
                    qtdTalhoes.innerHTML = `<span>${kpiPlant[0].quantidade}</span>`
    
                }else{
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

listarPlantacaoKPI()
session_carregar()

function session_carregar(){
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
