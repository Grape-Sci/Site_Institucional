var express = require("express");
var router = express.Router();

var dashTalhaoController = require("../controllers/dashTalhaoController");

router.get("/capturar_kpiTalhao/:idTalhao", function (req, res) {
    dashTalhaoController.capturar_kpiTalhao(req, res);
});

router.get("/capturarSituacao/:idTalhao", function (req, res) {
    dashTalhaoController.capturarSituacao(req, res);
});

router.get("/capturarDadosUltimas/:idTalhao", function (req, res) {
    dashTalhaoController.capturarDadosUltimas(req, res);
});

router.get("/capturarDadosGrafico/:idTalhao", function (req, res) {
    dashTalhaoController.capturarDadosGrafico(req, res);
});

module.exports = router;