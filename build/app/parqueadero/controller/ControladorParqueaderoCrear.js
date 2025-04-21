"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioParqueaderoCrear_1 = __importDefault(require("../service/ServicioParqueaderoCrear"));
const Parqueadero_1 = __importDefault(require("../model/Parqueadero"));
class ControladorParqueaderoCrear extends ServicioParqueaderoCrear_1.default {
    llamarGrabarParqueadero(req, res) {
        console.log(req.body);
        const objTemporal = new Parqueadero_1.default(0, 0, "", "", "");
        objTemporal.codUbicacion = req.body.codUbicacion;
        objTemporal.nombreParqueadero = req.body.nombreParqueadero;
        objTemporal.dirParqueadero = req.body.dirParqueadero;
        objTemporal.telParqueadero = req.body.telParqueadero;
        ServicioParqueaderoCrear_1.default.grabarParqueadero(objTemporal, res);
    }
}
const controladorParqueaderoCrear = new ControladorParqueaderoCrear();
exports.default = controladorParqueaderoCrear;
