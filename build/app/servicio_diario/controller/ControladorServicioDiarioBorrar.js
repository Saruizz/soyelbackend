"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioDiarioBorrar_1 = __importDefault(require("../service/ServicioDiarioBorrar"));
class ControladorServicioDiarioBorrar extends ServicioDiarioBorrar_1.default {
    llamarBorrarServicioDiario(req, res) {
        ServicioDiarioBorrar_1.default.borrarServicioDiario(req, res);
    }
}
const controladorServicioDiarioBorrar = new ControladorServicioDiarioBorrar();
exports.default = controladorServicioDiarioBorrar;
