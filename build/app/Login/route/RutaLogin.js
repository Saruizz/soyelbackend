"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorLogin_1 = __importDefault(require("../controller/ControladorLogin"));
const ValidarLogin_1 = require("../../../config/domain/ValidarLogin");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class RutaLogin {
    constructor() {
        this.rutaLoginApi = (0, express_1.Router)();
        this.configurarRutas();
    }
    configurarRutas() {
        // Ruta para iniciar sesión
        this.rutaLoginApi.post("/iniciar", ValidarLogin_1.datosLogin, ValidarDatos_1.default.ahora, ControladorLogin_1.default.llamarIniciarSesion);
        // Ruta para validar sesión
        this.rutaLoginApi.post("/validar", ValidarLogin_1.datosValidarSesion, ValidarDatos_1.default.ahora, ControladorLogin_1.default.llamarValidarSesion);
        // Ruta para cerrar sesión
        this.rutaLoginApi.post("/cerrar", ValidarLogin_1.datosCerrarSesion, ValidarDatos_1.default.ahora, ControladorLogin_1.default.llamarCerrarSesion);
        // Ruta para obtener historial de ingresos
        this.rutaLoginApi.get("/historial/:codUsuario", ValidarLogin_1.datosHistorialIngresos, ValidarDatos_1.default.ahora, ControladorLogin_1.default.llamarObtenerHistorialIngresos);
    }
}
const rutaLogin = new RutaLogin();
exports.default = rutaLogin.rutaLoginApi;
