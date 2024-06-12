var database = require("../database/config");

function capturar_kpiTalhao(idTalhao) {
  var instrucaoSql = `SELECT TIMESTAMPDIFF(DAY, now(), prevColheita) AS prevColheita, nomeTipo, tempMax, tempMin, umiMax, umiMin FROM Talhao JOIN Uva ON fkUva = idUva  WHERE idTalhao  =  ${idTalhao};`;

  return database.executar(instrucaoSql);
}

function capturarSituacao(idTalhao) {
  var instrucaoSql = `SELECT * FROM UltimosRegistrosTalhao WHERE fkTalhao = ${idTalhao};`;

  return database.executar(instrucaoSql);
}

function capturarDadosUltimas(idTalhao) {
  var instrucaoSql = `SELECT * FROM MaxMinRegistrosTalhaoUltimas24Horas WHERE fkTalhao = ${idTalhao};`;

  return database.executar(instrucaoSql);
}

module.exports = {
  capturar_kpiTalhao,
  capturarSituacao,
  capturarDadosUltimas
};
