var dashTalhaoModel = require("../models/dashPlantacaoModel");


function capturar_kpiTalhao(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("ID da Empresa está undefined!");
    } else {
        dashPlantacaoModel.capturar_kpiTalhao(idEmpresa)
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

module.exports = {
   capturar_kpiTalhao
};
