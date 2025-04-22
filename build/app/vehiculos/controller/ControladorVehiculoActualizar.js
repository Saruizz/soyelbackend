"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioVehiculoActualizar_1 = __importDefault(require("../service/ServicioVehiculoActualizar"));
const Vehiculo_1 = __importDefault(require("../model/Vehiculo"));
class ControladorVehiculoActualizar extends ServicioVehiculoActualizar_1.default {
    llamarActualizarVehiculo(req, res) {
        const objeto = new Vehiculo_1.default(0, 0, 0, "");
        objeto.codVehiculo = req.body.codVehiculo;
        objeto.codTipoVehiculo = req.body.codTipoVehiculo;
        objeto.codUsuario = req.body.codUsuario;
        objeto.placaVehiculo = req.body.placaVehiculo;
        ServicioVehiculoActualizar_1.default.actualizarVehiculo(objeto, res);
    }
}
const controladorVehiculoActualizar = new ControladorVehiculoActualizar();
exports.default = controladorVehiculoActualizar;
