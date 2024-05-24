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

function mostrarSituacaoTalhaoIdeal(idPlantacao) {
  var instrucaoSql = `
  SELECT COUNT(idTalhao) AS seguro FROM Talhao 
  JOIN Dispositivo ON fkTalhao = idTalhao 
  JOIN Registro ON fkDispositivo = idDispositivo
  JOIN Uva ON fkUva = idUva
  JOIN Plantacao ON idPlantacao = fkPlantacao
  WHERE (tempMax - 1 > consultaTemp AND tempMin + 1  < consultaTemp) AND 
  (umiMax - 1 > consultaUmi AND  umiMin + 1 > consultaUmi) AND idPlantacao = ${idPlantacao};
  `

  return database.executar(instrucaoSql);
}

module.exports = {
  exibirInfoPlantacoes,
  listarPlantacoes,
  mostrarSituacaoTalhaoIdeal
};
