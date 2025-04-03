"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioTarifaDiariaBorrar_1 = __importDefault(require("../service/ServicioTarifaDiariaBorrar"));
class ControladorTarifaDiariaBorrar extends ServicioTarifaDiariaBorrar_1.default {
    llamarBorrarTarifaDiaria(req, res) {
        ServicioTarifaDiariaBorrar_1.default.borrarTarifaDiaria(req, res);
    }
}
const controladorTarifaDiariaBorrar = new ControladorTarifaDiariaBorrar();
exports.default = controladorTarifaDiariaBorrar;
