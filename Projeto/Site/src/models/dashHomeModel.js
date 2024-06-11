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
  SELECT COUNT(DISTINCT(idTalhao)) AS seguro FROM Talhao 
  JOIN Dispositivo ON fkTalhao = idTalhao 
  JOIN Registro ON fkDispositivo = idDispositivo
  JOIN Uva ON fkUva = idUva
  JOIN Plantacao ON idPlantacao = fkPlantacao
  WHERE 
  (
  (tempMax - 2 >= consultaTemp AND tempMin + 2  <= consultaTemp) 
  AND 
  (umiMax + 2 >= consultaUmi AND  umiMin + 2 <= consultaUmi)
  ) 
  AND idPlantacao = ${idPlantacao};
  `

  return database.executar(instrucaoSql);
}

function mostrarSituacaoTalhaoPerigo(idPlantacao) {
  var instrucaoSql = `
  SELECT COUNT(DISTINCT(idTalhao)) AS perigo FROM Talhao 
  JOIN Dispositivo ON fkTalhao = idTalhao 
  JOIN Registro ON fkDispositivo = idDispositivo
  JOIN Uva ON fkUva = idUva
  JOIN Plantacao ON idPlantacao = fkPlantacao
  WHERE 
  (
  (tempMax < consultaTemp OR tempMin > consultaTemp) 
  OR 
  (umiMax < consultaUmi OR umiMin > consultaUmi)
  ) 
  AND idPlantacao = ${idPlantacao};`

  return database.executar(instrucaoSql);
}

function mostrarSituacaoTalhaoAlerta(idPlantacao) {
  var instrucaoSql = `
  SELECT COUNT(DISTINCT(idTalhao)) AS alerta FROM Talhao 
  JOIN Dispositivo ON fkTalhao = idTalhao 
  JOIN Registro ON fkDispositivo = idDispositivo
  JOIN Uva ON fkUva = idUva
  JOIN Plantacao ON idPlantacao = fkPlantacao
  WHERE 
  (
  ((consultaTemp >= tempMin  AND consultaTemp <= tempMin + 1) OR (consultaTemp <= tempMax AND consultaTemp >= tempMax -1)) 
  AND
  ((consultaUmi >= umiMin AND consultaUmi <= umiMin + 1) OR (consultaUmi <= umiMax AND consultaUmi >= umiMax -1))
  ) 
  AND idPlantacao = ${idPlantacao};
  `

  return database.executar(instrucaoSql);
}

function cadastrarPlantacao(id,area,idEmpresa) {

  var instrucaoSql = `
      INSERT INTO Plantacao (idPlantacao, areaTotal, fkEmpresa) VALUES 
      ('${id}', '${area}','${idEmpresa}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  exibirInfoPlantacoes,
  listarPlantacoes,
  mostrarSituacaoTalhaoIdeal,
  mostrarSituacaoTalhaoPerigo,
  mostrarSituacaoTalhaoAlerta,
  cadastrarPlantacao
};
