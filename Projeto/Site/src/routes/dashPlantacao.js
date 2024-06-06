var express = require("express");
var router = express.Router();

var dashPlantacaoController = require("../controllers/dashPlantacaoController");


router.get("/listarTalhoes/:idPlantacao", function (req, res) {
    dashPlantacaoController.listarTalhoes(req, res);
});


router.get("/listarTalhoesFOR/:idTalhao", function (req, res) {
    dashPlantacaoController.listarTalhoesFOR(req, res);
});

router.get("/listarPlantacoesKPI/:idPlantacao", function (req, res) {
    dashPlantacaoController.listarPlantacoesKPI(req, res);
});

router.get("/capturar_primeira_plantacoes/:idEmpresa", function (req, res) {
    dashPlantacaoController.capturar_primeira_plantacoes(req, res);
});


module.exports = router;