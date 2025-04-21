"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioPuestoCrear_1 = __importDefault(require("../service/ServicioPuestoCrear"));
class ControladorPuestoCrear extends ServicioPuestoCrear_1.default {
    llamarGrabarPuesto(req, res) {
        ServicioPuestoCrear_1.default.grabarPuesto(req, res);
    }
}
const controladorPuestoCrear = new ControladorPuestoCrear();
exports.default = controladorPuestoCrear;
