


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

function analisar(idTalhaoSelecionado) {
    var idTalhaoSelecionado = sessionStorage.TALHAO_ATUAL;
    window.location = "dashTalhao.html";
    fetch(`/dashTalhao/capturar_kpiTalhao/${idTalhaoSelecionado}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            resposta.json().then((plantacoes) => {


            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

async function gerarResposta() {
    const pergunta = document.getElementById('pergunta').value;

    const response = await fetch('http://localhost:3334/perguntar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pergunta })
    });

    const data = await response.json();

    resposta.style.display = 'block';
    document.getElementById('resposta').innerText = data.resultado;
}

function exibirUsuario() {
    var nome = sessionStorage.NOME_USUARIO;

    nomeUsuario.innerHTML = `${nome}`;
    var cargo = sessionStorage.CARGO_USUARIO;

    if(cargo == "Gerente") {
        listaNavBar.innerHTML += 
        `
        <span><a href="cadastroDash.html">Cadastro</a></span>
        
        `
    } 
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


var qtdTalhoesSeguro = 0;
var qtdTalhoesPerigo = 0;
var qtdTalhoesAlerta = 0;

var listaTempTalhao = [];
var listaUmiTalhao = []
async function listarTalhoes() {
    var idPlantacao = sessionStorage.PLANTACAO_ATUAL;
    var idMocked = sessionStorage.ID_MOCADO;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    if (idPlantacao == null || idPlantacao == "" || idPlantacao == undefined) {
        await session_carregar(idEmpresa);
        idPlantacao = sessionStorage.PLANTACAO_ATUAL;
        idMocked = sessionStorage.ID_MOCADO;
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
                sessionStorage.ID_MOCADO = 1;

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
