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

// function exibirTalhao() {
//     idTalhao = sessionStorage.TALHAO_ATUAL
//     tituloTalhao.innerHTML = `Talhão ${idTalhao}`
// }