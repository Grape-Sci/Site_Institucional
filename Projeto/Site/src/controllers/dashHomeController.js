var dashHomeModel = require("../models/dashHomeModel");

function exibirInfoPlantacoes(req, res) {
    var idEmpresa = req.body.idEmpresaServer;

    if (idEmpresa == undefined) {
        res.status(400).send("ID da empresa está undefined!");
    } else {
        dashHomeModel.exibirInfoPlantacoes(idEmpresa)
            .then(
                function (infoPlantacoes) {
                    console.log(infoPlantacoes);

                    res.status(200).json(infoPlantacoes)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o select da KPI Plantação! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    exibirInfoPlantacoes
};
