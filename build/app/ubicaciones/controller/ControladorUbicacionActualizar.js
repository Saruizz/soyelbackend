"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioUbicacionActualizar_1 = __importDefault(require("../service/ServicioUbicacionActualizar"));
const Ubicacion_1 = __importDefault(require("../model/Ubicacion"));
class ControladorUbicacionActualizar extends ServicioUbicacionActualizar_1.default {
    llamarActualizar(req, res) {
        const objetoUbicacion = new Ubicacion_1.default(0, 0, "", "");
        objetoUbicacion.codUbicacion = req.body.codUbicacion;
        objetoUbicacion.codPadreUbicacion = req.body.codPadreUbicacion;
        objetoUbicacion.codExternoUbicacion = req.body.codExternoUbicacion;
        objetoUbicacion.nombreUbicacion = req.body.nombreUbicacion;
        ServicioUbicacionActualizar_1.default.actualizarUbicacion(objetoUbicacion, res);
    }
}
const controladorUbicacionActualizar = new ControladorUbicacionActualizar();
exports.default = controladorUbicacionActualizar;
