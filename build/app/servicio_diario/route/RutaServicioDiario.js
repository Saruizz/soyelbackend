"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorServicioDiarioConsulta_1 = __importDefault(require("../controller/ControladorServicioDiarioConsulta"));
const ControladorServicioDiarioCrear_1 = __importDefault(require("../controller/ControladorServicioDiarioCrear"));
const ControladorServicioDiarioBorrar_1 = __importDefault(require("../controller/ControladorServicioDiarioBorrar"));
const ControladorServicioDiarioActualizar_1 = __importDefault(require("../controller/ControladorServicioDiarioActualizar"));
const ValidarServicioDiario_1 = require("../../../config/domain/ValidarServicioDiario");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class RutaServicioDiario {
    constructor() {
        this.rutaServicioDiarioApi = (0, express_1.Router)();
        this.configurarRutasConsulta();
        this.configurarRutasGestion();
    }
    configurarRutasConsulta() {
        // Obtener todos los servicios diarios
        this.rutaServicioDiarioApi.get("/getall", ControladorServicioDiarioConsulta_1.default.llamaroObtenerTodos);
        // Obtener servicio diario por ID
        this.rutaServicioDiarioApi.get("/getone/:codServicioDiario", ValidarServicioDiario_1.datosServicioDiarioVerParamServicioDiario, ValidarDatos_1.default.ahora, ControladorServicioDiarioConsulta_1.default.llamarObtenerUno);
    }
    configurarRutasGestion() {
        // Crear nuevo servicio diario
        this.rutaServicioDiarioApi.post("/add", ValidarServicioDiario_1.datosServicioDiarioCrear, ValidarDatos_1.default.ahora, ControladorServicioDiarioCrear_1.default.llamarGrabarServicioDiario);
        // Actualizar servicio diario
        this.rutaServicioDiarioApi.put("/update/:codServicioDiario", ValidarServicioDiario_1.datosServicioDiarioVerParamServicioDiario, ValidarServicioDiario_1.datosServicioDiarioActualizar, ValidarDatos_1.default.ahora, ControladorServicioDiarioActualizar_1.default.llamarActualizarServicioDiario);
        // Borrar servicio diario
        this.rutaServicioDiarioApi.delete("/delete/:codServicioDiario", ValidarServicioDiario_1.datosServicioDiarioVerParamServicioDiario, ValidarDatos_1.default.ahora, ControladorServicioDiarioBorrar_1.default.llamarBorrarServicioDiario);
    }
}
const rutaServicioDiario = new RutaServicioDiario();
exports.default = rutaServicioDiario.rutaServicioDiarioApi;
