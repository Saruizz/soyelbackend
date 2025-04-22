"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioVehiculoBorrar_1 = __importDefault(require("../service/ServicioVehiculoBorrar"));
const Vehiculo_1 = __importDefault(require("../model/Vehiculo"));
class ControladorVehiculoBorrar extends ServicioVehiculoBorrar_1.default {
    llamarBorrarVehiculo(req, res) {
        const codigo = Number(req.params.codVehiculo);
        const objVehiculo = new Vehiculo_1.default(codigo, 0, 0, "");
        ServicioVehiculoBorrar_1.default.borrarVehiculo(objVehiculo, res);
    }
}
const controladorVehiculoBorrar = new ControladorVehiculoBorrar();
exports.default = controladorVehiculoBorrar;
