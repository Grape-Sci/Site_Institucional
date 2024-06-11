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
  SELECT COUNT(DISTINCT T.idTalhao) AS seguro
FROM Talhao T
JOIN Dispositivo D ON T.idTalhao = D.fkTalhao
JOIN Registro R ON D.idDispositivo = R.fkDispositivo
JOIN Uva U ON T.fkUva = U.idUva
WHERE
    T.fkPlantacao = ${idPlantacao}
    AND R.registroDt = (
        SELECT MAX(registroDt)
        FROM Registro
        WHERE fkDispositivo = D.idDispositivo
    )
    AND R.consultaTemp BETWEEN U.tempMin + 2 AND U.tempMax - 2
    AND R.consultaUmi BETWEEN U.umiMin + 2 AND U.umiMax - 2;
`

  return database.executar(instrucaoSql);
}

function mostrarSituacaoTalhaoPerigo(idPlantacao) {
  var instrucaoSql = `
  SELECT COUNT(DISTINCT T.idTalhao) AS perigo
FROM Talhao T
JOIN Dispositivo D ON T.idTalhao = D.fkTalhao
JOIN Registro R ON D.idDispositivo = R.fkDispositivo
JOIN Uva U ON T.fkUva = U.idUva
WHERE
    T.fkPlantacao = ${idPlantacao}
    AND R.registroDt = (
        SELECT MAX(registroDt)
        FROM Registro
        WHERE fkDispositivo = D.idDispositivo
    )
    AND (
        R.consultaTemp < U.tempMin + 1 
        OR R.consultaTemp > U.tempMax - 1 
        OR R.consultaUmi < U.umiMin + 1 
        OR R.consultaUmi > U.umiMax - 1
    );
`

  return database.executar(instrucaoSql);
}

function mostrarSituacaoTalhaoAlerta(idPlantacao) {
  var instrucaoSql =
    `
  SELECT COUNT(DISTINCT T.idTalhao) AS alerta
FROM Talhao T
JOIN Dispositivo D ON T.idTalhao = D.fkTalhao
JOIN Registro R ON D.idDispositivo = R.fkDispositivo
JOIN Uva U ON T.fkUva = U.idUva
WHERE
    T.fkPlantacao = ${idPlantacao}
    AND R.registroDt = (
        SELECT MAX(registroDt)
        FROM Registro
        WHERE fkDispositivo = D.idDispositivo
    )
    AND (
        (R.consultaTemp >= U.tempMin AND R.consultaTemp <= U.tempMin + 1)
        OR (R.consultaTemp <= U.tempMax AND R.consultaTemp >= U.tempMax - 1)
    )
    AND (
        (R.consultaUmi >= U.umiMin AND R.consultaUmi <= U.umiMin + 1)
        OR (R.consultaUmi <= U.umiMax AND R.consultaUmi >= U.umiMax - 1)
    );;
  `

  return database.executar(instrucaoSql);
}

function cadastrarPlantacao(area,idEmpresa) {

  var instrucaoSql = `
      INSERT INTO Plantacao (areaTotal, fkEmpresa) VALUES 
      ('${area}','${idEmpresa}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarUva() {
  var instrucaoSql = `SELECT idUva, nomeTipo FROM Uva;`;

  return database.executar(instrucaoSql);
}

function cadastrarTalhao(IDselect, selectTipo, qtd, area, data) {

  var instrucaoSql = `
     INSERT INTO Talhao (qtdVieiras, tamAreaPlant, dtPlantio, fKUva, fkPlantacao, prevColheita) VALUES
      ('${qtd}', '${area}','${data}','${selectTipo}','${IDselect}', null);
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
  cadastrarPlantacao,
  listarUva,
  cadastrarTalhao
};
