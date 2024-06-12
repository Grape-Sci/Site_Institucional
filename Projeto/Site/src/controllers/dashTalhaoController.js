var dashTalhaoModel = require("../models/dashTalhaoModel");

function capturar_kpiTalhao(req, res) {
    var idTalhao = req.params.idTalhao;

    if (idTalhao == undefined) {
        res.status(400).send("ID da Empresa está undefined!");
    } else {
        dashTalhaoModel.capturar_kpiTalhao(idTalhao).then(
            function (infoTalhoes) {
                console.log(infoTalhoes);

                res.status(200).json(infoTalhoes)
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

function capturarSituacao(req, res) {
    var idTalhao = req.params.idTalhao;

    if (idTalhao == undefined) {
        res.status(400).send("ID da Empresa está undefined!");
    } else {
        dashTalhaoModel.capturarSituacao(idTalhao).then(
            function (infoTalhoes) {
                console.log(infoTalhoes);

                res.status(200).json(infoTalhoes)
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

function capturarDadosUltimas(req, res) {
    var idTalhao = req.params.idTalhao;

    if (idTalhao == undefined) {
        res.status(400).send("ID da Empresa está undefined!");
    } else {
        dashTalhaoModel.capturarDadosUltimas(idTalhao).then(
            function (infoTalhoes) {
                console.log(infoTalhoes);

                res.status(200).json(infoTalhoes)
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


module.exports = {
    capturar_kpiTalhao,
    capturarSituacao,
    capturarDadosUltimas
};
