"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioTarifaDiariaActualizar_1 = __importDefault(require("../service/ServicioTarifaDiariaActualizar"));
class ControladorTarifaDiariaActualizar extends ServicioTarifaDiariaActualizar_1.default {
    llamarActualizarTarifaDiaria(req, res) {
        ServicioTarifaDiariaActualizar_1.default.actualizarTarifaDiaria(req, res);
    }
}
const controladorTarifaDiariaActualizar = new ControladorTarifaDiariaActualizar();
exports.default = controladorTarifaDiariaActualizar;
