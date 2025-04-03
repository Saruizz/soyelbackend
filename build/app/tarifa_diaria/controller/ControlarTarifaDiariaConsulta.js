"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioTarifaDiariaConsulta_1 = __importDefault(require("../service/ServicioTarifaDiariaConsulta"));
class ControladorTarifaDiariaConsulta extends ServicioTarifaDiariaConsulta_1.default {
    llamaroObtenerTodos(req, res) {
        ServicioTarifaDiariaConsulta_1.default.obtenerTodos(res);
    }
}
