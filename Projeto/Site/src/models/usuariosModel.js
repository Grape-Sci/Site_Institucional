var database = require("../database/config");

function listarEmpresas() {
    var instrucaoSql = `SELECT idEmpresa, nome FROM Empresa;`;

    return database.executar(instrucaoSql);
}

function buscarCodigoEmpresa(idEmpresa) {
    var instrucaoSql = `SELECT codAutenticF, codAutenticG FROM Empresa WHERE idEmpresa = ${idEmpresa}`

    return database.executar(instrucaoSql);
}

function cadastrarDados(usuario, telefone, senha, email, cpf, idEmpresa, cargo) {
    if (cargo == 1) {
        cargo = "Gerente"
    }
    else {
        cargo = "Funcionário"
    }

    var instrucaoSql = `
        INSERT INTO Funcionario (nome, cpf, senha, email, telefone, cargo, fkEmpresa) VALUES 
        ('${usuario}', '${cpf}','${senha}', '${email}', '${telefone}', '${cargo}','${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(senha, email) {
    var instrucaoSql = `SELECT e.idEmpresa, f.nome, f.cargo, f.email FROM Funcionario AS f JOIN Empresa AS e ON fkEmpresa = idEmpresa
    WHERE email = '${email}' AND senha = '${senha}' ;`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
   
    return database.executar(instrucaoSql);
}

module.exports = {
    listarEmpresas,
    buscarCodigoEmpresa,
    cadastrarDados,
    autenticar
};
