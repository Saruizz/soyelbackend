"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioPuestoActualizar_1 = __importDefault(require("../service/ServicioPuestoActualizar"));
class ControladorPuestoActualizar extends ServicioPuestoActualizar_1.default {
    llamarActualizarPuesto(req, res) {
        ServicioPuestoActualizar_1.default.actualizarPuesto(req, res);
    }
}
const controladorPuestoActualizar = new ControladorPuestoActualizar();
exports.default = controladorPuestoActualizar;
