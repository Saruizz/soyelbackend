"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioVehiculoCrear_1 = __importDefault(require("../service/ServicioVehiculoCrear"));
const Vehiculo_1 = __importDefault(require("../model/Vehiculo"));
class ControladorVehiculoCrear extends ServicioVehiculoCrear_1.default {
    llamarGrabarVehiculo(req, res) {
        const objTemporal = new Vehiculo_1.default(0, 0, 0, "");
        objTemporal.codTipoVehiculo = req.body.codTipoVehiculo;
        objTemporal.codUsuario = req.body.codUsuario;
        objTemporal.placaVehiculo = req.body.placaVehiculo;
        ServicioVehiculoCrear_1.default.grabarVehiculo(objTemporal, res);
    }
}
const controladorVehiculoCrear = new ControladorVehiculoCrear();
exports.default = controladorVehiculoCrear;
