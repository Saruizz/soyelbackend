"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioParqueaderoConsulta_1 = __importDefault(require("../service/ServicioParqueaderoConsulta"));
class ControladorParqueaderoConsulta extends ServicioParqueaderoConsulta_1.default {
    llamarObtenerTodos(req, res) {
        ServicioParqueaderoConsulta_1.default.obtenerTodos(res);
    }
}
const controladorParqueaderoConsulta = new ControladorParqueaderoConsulta();
exports.default = controladorParqueaderoConsulta;
