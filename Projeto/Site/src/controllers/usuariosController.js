var usuariosModel = require("../models/usuariosModel");

function listarEmpresas(req, res) {
    usuariosModel.listarEmpresas().then((resultado) => {
        res.status(200).json(resultado);
    });
}

function buscarCodigoEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    console.log(idEmpresa);

    usuariosModel.buscarCodigoEmpresa(idEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os códigos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarDados(req, res) {
    var usuario = req.body.usuarioServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;
    var email = req.body.emailServer;
    var cargo = req.body.cargoServer;
    var cpf = req.body.cpfServer;
    var idEmpresa = req.body.idEmpresaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu e-mail undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuariosModel.cadastrarDados(usuario, telefone, senha, email, cpf, idEmpresa, cargo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    listarEmpresas,
    buscarCodigoEmpresa,
    cadastrarDados
};
