var dashPlantacaoModel = require("../models/dashPlantacaoModel");

function exibirInfoPlantacoes(req, res) {
    var idPlantacao = req.body.idPlantacaoServer;

    if (idPlantacao == undefined) {
        res.status(400).send("ID da usa Plantação está undefined!");
    } else {
        dashPlantacaoModel.exibirInfoTalhoes(idTalhoes)
            .then(
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
    var idPlantacao= req.params.idPlantacao;

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


function listarTalhoesFOR(req, res) {
    var idTalhao= req.params.idTalhao;

    dashPlantacaoModel.listarTalhoesFOR(idTalhao).then((resultado) => {
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


function listarPlantacoesKPI(req, res){
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
// function mostrarSituacaoTalhaoIdeal(req, res) {
//     var idPlantacao = req.params.idPlantacao;

//     dashHomeModel.mostrarSituacaoTalhaoIdeal(idPlantacao).then((resultado) => {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         }
//         else {
//             res.status(204).json([]);
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar os talhões: ", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }

module.exports = {
    exibirInfoPlantacoes,
    listarTalhoes,
    listarTalhoesFOR,
    listarPlantacoesKPI,
    capturar_primeira_plantacoes
};
