"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const { default: Turno } = require("../model/Turno");
const ServicioTurnoCrear = require("../service/ServicioTurnoCrear");
console.log("Turno importado: ", Turno);
class ControladorTurnoCrear extends ServicioTurnoCrear.default {
    llamarGrabarTurno(req, res) {
        console.log("Turno importado: ", Turno);
        const objTemporal = new Turno(
            0, 
            req.body.codParqueadero,
            req.body.descripcionTurno,
            new Date(req.body.fechaTurno),
            req.body.horaInicioTurno + ":00",
            req.body.horaFinTurno + ":00"
        );

        console.log("Datos recibidos: ", req.body);
        ServicioTurnoCrear.default.grabarTurno(objTemporal, res);
    }
}

const controladorTurnoCrear = new ControladorTurnoCrear();
exports.default = controladorTurnoCrear;