var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.get("/listarEmpresas", function (req, res) {
    usuariosController.listarEmpresas(req, res);
});

router.get("/buscarCodigoEmpresa/:idEmpresa", function(req, res) {
    usuariosController.buscarCodigoEmpresa(req,res);
});

router.post("/cadastrarDados/:idEmpresa", function(req, res) {
    usuariosController.cadastrarDados(req, res)
});

module.exports = router;