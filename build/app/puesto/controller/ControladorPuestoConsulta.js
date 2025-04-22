"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioPuestoConsulta_1 = __importDefault(require("../service/ServicioPuestoConsulta"));
class ControladorPuestoConsulta extends ServicioPuestoConsulta_1.default {
    llamarObtenerTodos(req, res) {
        ServicioPuestoConsulta_1.default.obtenerTodos(res);
    }
    llamarObtenerUno(req, res) {
        ServicioPuestoConsulta_1.default.obtenerUno(req, res);
    }
}
const controladorPuestoConsulta = new ControladorPuestoConsulta();
exports.default = controladorPuestoConsulta;
