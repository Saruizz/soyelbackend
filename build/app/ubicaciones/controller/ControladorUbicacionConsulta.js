"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioUbicacionConsulta_1 = __importDefault(require("../service/ServicioUbicacionConsulta"));
class ControladorUbicacionConsulta extends ServicioUbicacionConsulta_1.default {
    llamarObtenerTodos(req, res) {
        ServicioUbicacionConsulta_1.default.obtenerTodos(res);
    }
}
const controladorUbicacionConsulta = new ControladorUbicacionConsulta();
exports.default = controladorUbicacionConsulta;
