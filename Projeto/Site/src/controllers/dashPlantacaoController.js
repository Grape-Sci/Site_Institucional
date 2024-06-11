var dashPlantacaoModel = require("../models/dashPlantacaoModel");

function capturar_primeira_plantacoes(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("ID da Empresa está undefined!");
    } else {
        dashPlantacaoModel.capturar_primeira_plantacoes(idEmpresa)
            .then(
                function (infoEmpresa) {
                    console.log(infoEmpresa);

                    res.status(200).json(infoEmpresa)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o select da KPI Talhão! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function listarTalhoes(req, res) {
    var idPlantacao = req.params.idPlantacao;

    dashPlantacaoModel.listarTalhoes(idPlantacao).then((resultado) => {
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


function listarPlantacoesKPI(req, res) {
    var idPlantacao = req.params.idPlantacao;

    dashPlantacaoModel.listarPlantacoesKPI(idPlantacao).then((resultado) => {
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



function capturarDadosTalhoes(req, res) {
    var idTalhao = req.params.idTalhao;

    dashPlantacaoModel.capturarDadosTalhoes(idTalhao).then((resultado) => {
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


module.exports = {
    listarTalhoes,
    listarPlantacoesKPI,
    capturar_primeira_plantacoes,
    capturarDadosTalhoes
};
