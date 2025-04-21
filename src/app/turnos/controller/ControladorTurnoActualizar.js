"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? { "default": mod } : mod;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioTurnoActualizar = __importDefault(require("../service/ServicioTurnoActualizar"));
const Turno_1 = __importDefault(require("../model/Turno"));

class ControladorTurnoActualizar {
    llamarActualizar(req, res) {
        try {
            const objetito = new Turno_1.default(0, 0, "", new Date(), new Date(), new Date());

            objetito.codTurno = req.body.codTurno;
            objetito.codParqueadero = req.body.codParqueadero;
            objetito.descripcionTurno = req.body.descripcionTurno;
            objetito.fechaTurno = new Date(req.body.fechaTurno);
            objetito.horaInicioTurno = new Date(req.body.horaInicioTurno);
            objetito.horaFinTurno = new Date(req.body.horaFinTurno);

            ServicioTurnoActualizar_1.default.actualizarTurno(objetito, res);
        } catch (error) {
            console.error("Error en la conversión de datos: ", error);
            res.status(400).json({ respuesta: "Datos inválidos para la actualización del turno." });
        }
    }
}

const controladorTurnoActualizar = new ControladorTurnoActualizar();
exports.default = controladorTurnoActualizar;