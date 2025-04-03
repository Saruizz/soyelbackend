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
    llamarObtenerUno(req, res) {
        ServicioTarifaDiariaConsulta_1.default.obtenerUno(req, res);
    }
    llamarObtenerPorParqueadero(req, res) {
        ServicioTarifaDiariaConsulta_1.default.obtenerPorParqueadero(req, res);
    }
    llamarObtenerPorTipoVehiculo(req, res) {
        ServicioTarifaDiariaConsulta_1.default.obtenerPorTipoVehiculo(req, res);
    }
}
const controladorTarifaDiariaConsulta = new ControladorTarifaDiariaConsulta();
exports.default = controladorTarifaDiariaConsulta;
