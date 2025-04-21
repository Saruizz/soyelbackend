"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControladorUbicacionConsulta_1 = __importDefault(require("../controller/ControladorUbicacionConsulta"));
const ControladorUbicacionCrear_1 = __importDefault(require("../controller/ControladorUbicacionCrear"));
const ValidarUbicacion_1 = require("../../../config/domain/ValidarUbicacion");
const ControladorUbicacionBorrar_1 = __importDefault(require("../controller/ControladorUbicacionBorrar"));
const ControladorUbicacionActualizar_1 = __importDefault(require("../controller/ControladorUbicacionActualizar"));
class RutaUbicacion {
    constructor() {
        this.rutaUbicacionApi = (0, express_1.Router)();
        this.rutaUbicacionApi.get("/getall", ControladorUbicacionConsulta_1.default.llamarObtenerTodos);
        this.rutaUbicacionApi.post("/add", ValidarUbicacion_1.datosUbicacionCrear, ValidarDatos_1.default.ahora, ControladorUbicacionCrear_1.default.llamarGrabarUbicacion);
        this.rutaUbicacionApi.delete("/delete/:codUbicacion", ValidarUbicacion_1.datosUbicacionBorrar, ValidarDatos_1.default.ahora, ControladorUbicacionBorrar_1.default.llamarBorrar);
        this.rutaUbicacionApi.put("/update", ControladorUbicacionActualizar_1.default.llamarActualizar);
    }
}
const rutaUbicacion = new RutaUbicacion();
exports.default = rutaUbicacion.rutaUbicacionApi;
