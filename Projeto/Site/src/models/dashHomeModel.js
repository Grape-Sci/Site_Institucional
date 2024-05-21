var database = require("../database/config");


function exibirInfoPlantacoes(idEmpresa) {
    var instrucaoSql = `SELECT COUNT(idPlantacao) AS quantidade, SUM(areaTotal) AS somaArea FROM  Plantacao JOIN Empresa ON idEmpresa = fkEmpresa WHERE idEmpresa = ${idEmpresa};`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
   
    return database.executar(instrucaoSql);
}

module.exports = {
    exibirInfoPlantacoes
};
