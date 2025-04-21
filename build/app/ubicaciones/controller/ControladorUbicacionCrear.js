"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioUbicacionCrear_1 = __importDefault(require("../service/ServicioUbicacionCrear"));
const Ubicacion_1 = __importDefault(require("../model/Ubicacion"));
class ControladorUbicacionCrear extends ServicioUbicacionCrear_1.default {
    llamarGrabarUbicacion(req, res) {
        console.log(req.body);
        const objTemporal = new Ubicacion_1.default(0, 0, "", "");
        objTemporal.codPadreUbicacion = req.body.codPadreUbicacion;
        objTemporal.codExternoUbicacion = req.body.codExternoUbicacion;
        objTemporal.nombreUbicacion = req.body.nombreUbicacion;
        ServicioUbicacionCrear_1.default.grabarUbicacion(objTemporal, res);
    }
}
const controladorUbicacionCrear = new ControladorUbicacionCrear();
exports.default = controladorUbicacionCrear;
