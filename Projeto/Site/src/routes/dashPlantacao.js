var express = require("express");
var router = express.Router();

var dashPlantacaoController = require("../controllers/dashPlantacaoController");


router.get("/listarTalhoes/:idPlantacao", function (req, res) {
    dashPlantacaoController.listarTalhoes(req, res);
});


router.get("/listarTalhoesFOR/:idTalhao", function (req, res) {
    dashPlantacaoController.listarTalhoesFOR(req, res);
});

router.get("/listarQtdArea/:idPlantacao", function (req, res) {
    dashPlantacaoController.listarQtdArea(req, res);
});


module.exports = router;