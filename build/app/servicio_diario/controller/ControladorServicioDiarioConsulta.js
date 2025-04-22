"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioDiarioConsulta_1 = __importDefault(require("../service/ServicioDiarioConsulta"));
class ControladorServicioDiarioConsulta extends ServicioDiarioConsulta_1.default {
    llamaroObtenerTodos(req, res) {
        ServicioDiarioConsulta_1.default.obtenerTodos(res);
    }
    llamarObtenerUno(req, res) {
        ServicioDiarioConsulta_1.default.obtenerUno(req, res);
    }
    llamarobtenerPorServicio(req, res) {
        ServicioDiarioConsulta_1.default.obtenerPorCodigoServicio(req, res);
    }
}
const controladorServicioDiarioConsulta = new ControladorServicioDiarioConsulta();
exports.default = controladorServicioDiarioConsulta;
