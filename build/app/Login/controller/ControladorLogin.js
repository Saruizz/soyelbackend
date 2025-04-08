"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioLogin_1 = __importDefault(require("../service/ServicioLogin"));
class ControladorLogin extends ServicioLogin_1.default {
    llamarIniciarSesion(req, res) {
        console.log("Credenciales: ", req.body.claveAcceso);
        ServicioLogin_1.default.iniciarSesion(req, res);
    }
    llamarValidarSesion(req, res) {
        ServicioLogin_1.default.validarSesion(req, res);
    }
    llamarCerrarSesion(req, res) {
        ServicioLogin_1.default.cerrarSesion(req, res);
    }
    llamarObtenerHistorialIngresos(req, res) {
        ServicioLogin_1.default.obtenerHistorialIngresos(req, res);
    }
}
const controladorLogin = new ControladorLogin();
exports.default = controladorLogin;
