"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioTurnoActualizar_1 = __importDefault(require("../service/ServicioTurnoActualizar"));
const Turno_1 = __importDefault(require("../model/Turno"));
class ControladorTurnoActualizar extends ServicioTurnoActualizar_1.default {
    llamarActualizar(req, res) {
        const objetoTurno = new Turno_1.default(0, 0, "", "", "", "");
        objetoTurno.codTurno = req.body.codTurno;
        objetoTurno.codParqueadero = req.body.codParqueadero;
        objetoTurno.descripcionTurno = req.body.descripcionTurno;
        objetoTurno.fechaTurno = req.body.fechaTurno;
        objetoTurno.horaInicioTurno = req.body.horaInicioTurno;
        objetoTurno.horaFinTurno = req.body.horaFinTurno;
        ServicioTurnoActualizar_1.default.actualizarTurno(objetoTurno, res);
    }
}
const controladorTurnoActualzar = new ControladorTurnoActualizar();
exports.default = controladorTurnoActualzar;
