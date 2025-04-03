"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioTipoVehiculoBorrar_1 = __importDefault(require("../service/ServicioTipoVehiculoBorrar"));
const TipoVehiculo_1 = __importDefault(require("../model/TipoVehiculo"));
class ControladorTipoVehiculoBorrar extends ServicioTipoVehiculoBorrar_1.default {
    llamarBorrar(req, res) {
        const codigo = Number(req.params.codTipoVehiculo);
        const objTipoVehiculo = new TipoVehiculo_1.default(codigo, "");
        ServicioTipoVehiculoBorrar_1.default.borrar(objTipoVehiculo, res);
    }
}
const controladorTipoVehiculoBorrar = new ControladorTipoVehiculoBorrar();
exports.default = controladorTipoVehiculoBorrar;
