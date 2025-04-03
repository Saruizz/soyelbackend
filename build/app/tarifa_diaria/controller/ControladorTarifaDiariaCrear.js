"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioTarifaDiariaCrear_1 = __importDefault(require("../service/ServicioTarifaDiariaCrear"));
class ControladorTarifaDiariaCrear extends ServicioTarifaDiariaCrear_1.default {
    llamarGrabarTarifaDiaria(req, res) {
        ServicioTarifaDiariaCrear_1.default.grabarTarifaDiaria(req, res);
    }
}
const controladorTarifaDiariaCrear = new ControladorTarifaDiariaCrear();
exports.default = controladorTarifaDiariaCrear;
