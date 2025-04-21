"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioParqueaderoActualizar_1 = __importDefault(require("../service/ServicioParqueaderoActualizar"));
const Parqueadero_1 = __importDefault(require("../model/Parqueadero"));
class ControladorParqueaderoActualizar extends ServicioParqueaderoActualizar_1.default {
    llamarActualizar(req, res) {
        const objetoParqueadero = new Parqueadero_1.default(0, 0, "", "", "");
        objetoParqueadero.codParqueadero = req.body.codParqueadero;
        objetoParqueadero.codUbicacion = req.body.codUbicacion;
        objetoParqueadero.nombreParqueadero = req.body.nombreParqueadero;
        objetoParqueadero.dirParqueadero = req.body.dirParqueadero;
        objetoParqueadero.telParqueadero = req.body.telParqueadero;
        ServicioParqueaderoActualizar_1.default.actualizarParqueadero(objetoParqueadero, res);
    }
}
const controladorParqueaderoActualzar = new ControladorParqueaderoActualizar();
exports.default = controladorParqueaderoActualzar;
