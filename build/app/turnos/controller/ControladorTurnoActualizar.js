"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioTurnoActualizar_1 = __importDefault(require("../service/ServicioTurnoActualizar"));
class ControladorTurnoActualizar {
    llamarActualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codTurno = Number(req.params.codturno);
            if (isNaN(codTurno) || codTurno <= 0) {
                res.status(400).json({ respuesta: "Código de turno inválido" });
                return;
            }
            const { cod_turno, cod_Parqueadero, descripcion_turno, fecha_turno, hora_inicio_turno, hora_fin_turno } = req.body;
            if (!cod_Parqueadero || !descripcion_turno || !fecha_turno || !hora_inicio_turno || !hora_fin_turno) {
                res.status(400).json({ respuesta: "Faltan datos obligatorios en el cuerpo de la solicitud" });
                return Promise.resolve();
            }
            const datosTurno = {
                codTurno: cod_turno,
                codParqueadero: cod_Parqueadero,
                descripcionTurno: descripcion_turno,
                fechaTurno: fecha_turno,
                horaInicioTurno: hora_inicio_turno,
                horaFinTurno: hora_fin_turno
            };
            try {
                yield ServicioTurnoActualizar_1.default.actualizarTurno(datosTurno, res);
            }
            catch (error) {
                console.error("Error en la actualización:", error);
                res.status(500).json({ respuesta: "Error interno del servidor" });
            }
        });
    }
}
exports.default = new ControladorTurnoActualizar();
