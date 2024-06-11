var database = require("../database/config");

function capturar_primeira_plantacoes(idEmpresa) {
  var instrucaoSql = `SELECT idPlantacao FROM Plantacao JOIN Empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = ${idEmpresa} ORDER BY idPlantacao LIMIT 1;`;

  return database.executar(instrucaoSql);
}

function listarTalhoes(idPlantacao) {
  var instrucaoSql =
  `
  SELECT idTalhao, nomeTipo, umiMax, umiMin, tempMax, tempMin FROM Talhao JOIN Plantacao ON fkPlantacao = idPlantacao JOIN Uva ON fkUva = idUva WHERE idPlantacao = ${idPlantacao};
  `

  return database.executar(instrucaoSql);
}


function listarPlantacoesKPI(idPlantacao) {
  var instrucaoSql =
    `
  SELECT COUNT(idTalhao) AS quantidade, areaTotal AS area FROM Talhao RIGHT JOIN Plantacao ON fkPlantacao = idPlantacao WHERE idPlantacao = ${idPlantacao};
  `;

  return database.executar(instrucaoSql);
}

function capturarDadosTalhoes(idTalhao) {
  var instrucaoSql =
    `
    SELECT * FROM UltimosRegistrosTalhao WHERE fkTalhao = ${idTalhao};
    `;

  return database.executar(instrucaoSql);
}




module.exports = {
  listarTalhoes,
  listarPlantacoesKPI,
  capturar_primeira_plantacoes,
  capturarDadosTalhoes
};
