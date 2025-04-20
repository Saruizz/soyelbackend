"use strict";

const ServicioTurnoBorrar = require("../service/ServicioTurnoBorrar");
const Turno = require("../model/Turno");

class ControladorTurnoBorrar {
    llamarBorrar(req, res) {
        const codigo = Number(req.params.cod_turno); 
        const objTurno = new Turno(codigo, 0, "", "", "", "");
        ServicioTurnoBorrar.borrar(objTurno, res);
    }
}

const controladorTurnoBorrar = new ControladorTurnoBorrar();
module.exports = controladorTurnoBorrar;    