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

function capturar_primeira_plantacoes(idEmpresa) {
  var instrucaoSql = `SELECT idPlantacao FROM Plantacao JOIN Empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = ${idEmpresa} ORDER BY idPlantacao LIMIT 1;`;

  return database.executar(instrucaoSql);
}


function listarTalhoes(idPlantacao, idEmpresa) {
  var instrucaoSql = `SELECT nomeTipo, consultaUmi, consultaTemp, tempMax, tempMin, umiMin, umiMax 
  FROM Talhao JOIN Uva ON fkUva = idUva JOIN Dispositivo ON fkTalhao = idTalhao 
  JOIN Registro ON fkDispositivo = idDispositivo 
  JOIN Plantacao ON fkPlantacao = idPlantacao 
  JOIN Empresa ON fkEmpresa = idEmpresa 
  WHERE idPlantacao = ${idPlantacao} AND idEmpresa = ${idEmpresa} ORDER BY registroDt DESC;
  `

  return database.executar(instrucaoSql);
}

function listarTalhoesFOR(talhaoAtual) {
  var instrucaoSql = `SELECT * FROM Talhao WHERE idTalhao = ${talhaoAtual}`;

  return database.executar(instrucaoSql);
}


function listarPlantacoesKPI(idPlantacao, idEmpresa) {
  var instrucaoSql = `SELECT nomeTipo, consultaUmi, consultaTemp, tempMax, tempMin, umiMin, umiMax 
  FROM Talhao JOIN Uva ON fkUva = idUva JOIN Dispositivo ON fkTalhao = idTalhao 
  JOIN Registro ON fkDispositivo = idDispositivo 
  JOIN Plantacao ON fkPlantacao = idPlantacao 
  JOIN Empresa ON fkEmpresa = idEmpresa 
  WHERE idPlantacao = ${idPlantacao} AND idEmpresa = ${idEmpresa} ORDER BY registroDt DESC;
  `;

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
  mostrarSituacaoTalhaoIdeal,
  listarTalhoesFOR,
  listarTalhoes,
  listarPlantacoesKPI,
  capturar_primeira_plantacoes
};