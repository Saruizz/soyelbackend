"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioDiarioActualizar_1 = __importDefault(require("../service/ServicioDiarioActualizar"));
class ControladorServicioDiarioActualizar extends ServicioDiarioActualizar_1.default {
    llamarActualizarServicioDiario(req, res) {
        ServicioDiarioActualizar_1.default.actualizarServicioDiario(req, res);
    }
}
const controladorServicioDiarioActualizar = new ControladorServicioDiarioActualizar();
exports.default = controladorServicioDiarioActualizar;
