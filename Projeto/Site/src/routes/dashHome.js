var express = require("express");
var router = express.Router();

var dashHomeController = require("../controllers/dashHomeController");

router.post("/exibirInfoPlantacoes", function (req, res) {
    dashHomeController.exibirInfoPlantacoes(req, res);
});

router.get("/listarPlantacoes/:idEmpresa", function (req, res) {
    dashHomeController.listarPlantacoes(req, res);
});

router.get("/mostrarSituacaoTalhao/:idPlantacao", function (req, res) {
    dashHomeController.mostrarSituacaoTalhao(req, res)
});

module.exports = router;