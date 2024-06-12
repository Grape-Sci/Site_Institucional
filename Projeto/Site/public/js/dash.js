


function sair() {
    window.location = "index.html";
    sessionStorage.ID_EMPRESA = ''
    sessionStorage.ID_MOCADO_PLANTACAO = ''
    sessionStorage.TALHAO_ATUAL = ''
    sessionStorage.NOME_USUARIO = ''
    sessionStorage.CARGO_USUARIO = ''
    sessionStorage.EMAIL_USUARIO = ''
    sessionStorage.PLANTACAO_ATUAL = ''
}

function monitorar(idPlantacaoSelecionada, idMocado) {
    sessionStorage.PLANTACAO_ATUAL = idPlantacaoSelecionada;
    sessionStorage.ID_MOCADO_PLANTACAO = idMocado;
    window.location = "dashPlantacao.html";
}

function analisar(idTalhaoSelecionado, idMocado) {
    sessionStorage.TALHAO_ATUAL = idTalhaoSelecionado;
    sessionStorage.ID_MOCADO_TALHAO = idMocado;
    window.location = "dashTalhao.html";
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

    if (cargo == "Gerente") {
        listaNavBar.innerHTML +=
            `
        <span><a href="cadastroDash.html">Cadastro</a></span>
        
        `
    }
}