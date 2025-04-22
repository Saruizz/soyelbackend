"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorPuestoConsulta_1 = __importDefault(require("../controller/ControladorPuestoConsulta"));
const ControladorPuestoCrear_1 = __importDefault(require("../controller/ControladorPuestoCrear"));
const ControladorPuestoBorrar_1 = __importDefault(require("../controller/ControladorPuestoBorrar"));
const ControladorPuestoActualizar_1 = __importDefault(require("../controller/ControladorPuestoActualizar"));
const ValidarPuesto_1 = require("../../../config/domain/ValidarPuesto");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class RutaPuesto {
    constructor() {
        this.rutaPuestoApi = (0, express_1.Router)();
        this.configurarRutasConsulta();
        this.configurarRutasGestion();
    }
    configurarRutasConsulta() {
        // Obtener todos los puestos
        this.rutaPuestoApi.get("/getall", ControladorPuestoConsulta_1.default.llamarObtenerTodos);
        // Obtener puesto por ID
        this.rutaPuestoApi.get("/getone/:codPuesto", ValidarPuesto_1.datosPuestoVerParam, ValidarDatos_1.default.ahora, ControladorPuestoConsulta_1.default.llamarObtenerUno);
    }
    configurarRutasGestion() {
        // Crear nuevo puesto
        this.rutaPuestoApi.post("/add", ValidarPuesto_1.datosPuestoCrear, ValidarDatos_1.default.ahora, ControladorPuestoCrear_1.default.llamarGrabarPuesto);
        // Borrar puesto
        this.rutaPuestoApi.delete("/delete/:codPuesto", ValidarPuesto_1.datosPuestoVerParam, ValidarDatos_1.default.ahora, ControladorPuestoBorrar_1.default.llamarBorrarPuesto);
        // Actualizar puesto
        this.rutaPuestoApi.put("/update/:codPuesto", ValidarPuesto_1.datosPuestoVerParam, ValidarPuesto_1.datosPuestoActualizar, ValidarDatos_1.default.ahora, ControladorPuestoActualizar_1.default.llamarActualizarPuesto);
    }
}
const rutaPuesto = new RutaPuesto();
exports.default = new RutaPuesto().rutaPuestoApi;
