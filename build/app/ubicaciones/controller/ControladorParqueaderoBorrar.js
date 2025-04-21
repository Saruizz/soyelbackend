"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioParqueaderoBorrar_1 = __importDefault(require("../service/ServicioParqueaderoBorrar"));
const Ubicacion_1 = __importDefault(require("../model/Ubicacion"));
class ControladorParqueaderoBorrar extends ServicioParqueaderoBorrar_1.default {
    llamarBorrar(req, res) {
        const codigo = Number(req.params.codParqueadero);
        const objParqueadero = new Ubicacion_1.default(codigo, 0, "", "", "");
        ServicioParqueaderoBorrar_1.default.borrar(objParqueadero, res);
    }
}
const controladorParqueaderoBorrar = new ControladorParqueaderoBorrar();
exports.default = controladorParqueaderoBorrar;
