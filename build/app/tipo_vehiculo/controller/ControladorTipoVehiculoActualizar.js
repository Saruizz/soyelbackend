"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioTipoVehiculoActualizar_1 = __importDefault(require("../service/ServicioTipoVehiculoActualizar"));
const TipoVehiculo_1 = __importDefault(require("../model/TipoVehiculo"));
class ControladortTipoVehiculoActualizar extends ServicioTipoVehiculoActualizar_1.default {
    llamarActualizar(req, res) {
        const objeto = new TipoVehiculo_1.default(0, "");
        objeto.codTipoVehiculo = req.body.codTipoVehiculo;
        objeto.claseTipoVehiculo = req.body.claseTipoVehiculo;
        ServicioTipoVehiculoActualizar_1.default.actualizarTipoVehiculo(objeto, res);
    }
}
const controladortTipoVehiculoActualizar = new ControladortTipoVehiculoActualizar();
exports.default = controladortTipoVehiculoActualizar;
