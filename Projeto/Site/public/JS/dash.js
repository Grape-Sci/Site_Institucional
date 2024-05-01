function sair() {
    window.location = "Inicio.html";
}

function monitorar(idPlantacaoSelecionada) {
    sessionStorage.PLANTACAO_ATUAL = idPlantacaoSelecionada;
    window.location = "dashPlantacao.html";
}

function exibirPlantacao() {
    var idPlantacao = sessionStorage.PLANTACAO_ATUAL;
    tituloPlantacao.innerHTML = `Plantação ${idPlantacao}`
}

function analisar(idTalhaoSelecionado) {
    sessionStorage.TALHAO_ATUAL = idTalhaoSelecionado;
    window.location = "dashTalhao.html";
}

function exibirTalhao() {
    idTalhao = sessionStorage.TALHAO_ATUAL
    tituloTalhao.innerHTML = `Talhão ${idTalhao}`
}