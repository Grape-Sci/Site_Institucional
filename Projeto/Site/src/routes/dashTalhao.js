var express = require("express");
var router = express.Router();

var dashTalhaoController = require("../controllers/dashTalhaoController");

router.get("/capturar_kpiTalhao/:idEmpresa", function (req, res) {
    dashTalhaoController.capturar_kpiTalhao(req, res);
});


module.exports = router;