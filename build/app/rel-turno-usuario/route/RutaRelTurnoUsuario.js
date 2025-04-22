"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorRelTurnoUsuario_1 = __importDefault(require("../controller/ControladorRelTurnoUsuario"));
const ValidarRelTurnoUsuario_1 = require("../../../config/domain/ValidarRelTurnoUsuario");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class RutaRelTurnoUsuario {
    constructor() {
        this.rutaApi = (0, express_1.Router)();
        this.configurarRutas();
    }
    configurarRutas() {
        this.rutaApi.post("/add", ValidarRelTurnoUsuario_1.datosRelTurnoUsuario, ValidarDatos_1.default.ahora, ControladorRelTurnoUsuario_1.default.crearRelacion);
        this.rutaApi.delete("/delete/:codTurnoUsuario", ValidarDatos_1.default.ahora, ControladorRelTurnoUsuario_1.default.eliminarRelacion);
        this.rutaApi.get("/getall", ControladorRelTurnoUsuario_1.default.obtenerTodasLasRelaciones);
        this.rutaApi.put("/update/:codTurnoUsuario", ValidarDatos_1.default.ahora, ControladorRelTurnoUsuario_1.default.actualizarRelacion);
    }
}
const rutaRelTurnoUsuarioApi = new RutaRelTurnoUsuario().rutaApi;
exports.default = rutaRelTurnoUsuarioApi;
