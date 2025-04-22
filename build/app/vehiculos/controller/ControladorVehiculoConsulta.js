"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioVehiculoConsulta_1 = __importDefault(require("../service/ServicioVehiculoConsulta"));
class ControladorVehiculoConsulta extends ServicioVehiculoConsulta_1.default {
    llamarObtenerTodos(req, res) {
        ServicioVehiculoConsulta_1.default.obtenerTodos(res);
    }
    llamarObtenerPorCodVehiculo(req, res) {
        ServicioVehiculoConsulta_1.default.obtenerPorCodVehiculo(req, res);
    }
    llamarObtenerPorTipoVehiculo(req, res) {
        ServicioVehiculoConsulta_1.default.obtenerPorTipoVehiculo(req, res);
    }
    llamarObtenerPorUsuario(req, res) {
        ServicioVehiculoConsulta_1.default.obtenerPorUsuario(req, res);
    }
    llamarObtenerPorPlaca(req, res) {
        ServicioVehiculoConsulta_1.default.obtenerPorPlaca(req, res);
    }
    llamarObtenerPorParqueadero(req, res) {
        ServicioVehiculoConsulta_1.default.obtenerPorParqueadero(req, res);
    }
}
const controladorVehiculoConsulta = new ControladorVehiculoConsulta();
exports.default = controladorVehiculoConsulta;
