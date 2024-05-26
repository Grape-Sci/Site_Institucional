var express = require("express");
var router = express.Router();

var dashHomeController = require("../controllers/dashHomeController");

router.post("/exibirInfoPlantacoes", function (req, res) {
    dashHomeController.exibirInfoPlantacoes(req, res);
});

router.get("/listarPlantacoes/:idEmpresa", function (req, res) {
    dashHomeController.listarPlantacoes(req, res);
});

router.get("/mostrarSituacaoTalhaoIdeal/:idPlantacao", function (req, res) {
    dashHomeController.mostrarSituacaoTalhaoIdeal(req, res)
});

router.get("/mostrarSituacaoTalhaoPerigo/:idPlantacao", function (req, res) {
    dashHomeController.mostrarSituacaoTalhaoPerigo(req, res)
});

router.get("/mostrarSituacaoTalhaoAlerta/:idPlantacao", function (req, res) {
    dashHomeController.mostrarSituacaoTalhaoAlerta(req, res)
});

module.exports = router;