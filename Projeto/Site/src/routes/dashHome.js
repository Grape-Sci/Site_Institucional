var express = require("express");
var router = express.Router();

var dashHomeController = require("../controllers/dashHomeController");

router.post("/exibirInfoPlantacoes", function (req, res) {
    dashHomeController.exibirInfoPlantacoes(req, res);
});

module.exports = router;