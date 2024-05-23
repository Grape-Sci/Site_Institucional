var database = require("../database/config");

function exibirInfoPlantacoes(idEmpresa) {
  var instrucaoSql = `SELECT COUNT(idPlantacao) AS quantidade, SUM(areaTotal) AS somaArea FROM  Plantacao JOIN Empresa ON idEmpresa = fkEmpresa WHERE idEmpresa = ${idEmpresa};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);
}

function listarPlantacoes(idEmpresa) {
  var instrucaoSql = `SELECT idPlantacao FROM Plantacao JOIN Empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = ${idEmpresa};`;

    return database.executar(instrucaoSql);
}

function mostrarSituacaoTalhao(idPlantacao){
  var instrucaoSql = `
  SELECT idTalhao, consultaUmi, consultaTemp, tempMax, tempMin, umiMax, umiMinFROM Talhao JOIN Uva ON fkUva = idUva
  JOIN Dispositivo ON fkTalhao = idTalhao
  JOIN Registro ON fkDispositivo = idDispositivo
  JOIN Plantacao ON fkPlantacao = idPlantacao
  WHERE idPlantacao = ${idPlantacao};`

  return database.executar(instrucaoSql);
}

module.exports = {
  exibirInfoPlantacoes,
  listarPlantacoes,
  mostrarSituacaoTalhao
};
