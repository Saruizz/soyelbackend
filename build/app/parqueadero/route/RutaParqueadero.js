"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControladorParqueaderoConsulta_1 = __importDefault(require("../controller/ControladorParqueaderoConsulta"));
const ValidarParqueadero_1 = require("../../../config/domain/ValidarParqueadero");
const ControladorParqueaderoCrear_1 = __importDefault(require("../controller/ControladorParqueaderoCrear"));
const ControladorParqueaderoBorrar_1 = __importDefault(require("../controller/ControladorParqueaderoBorrar"));
const ControladorParqueaderoActualizar_1 = __importDefault(require("../controller/ControladorParqueaderoActualizar"));
class RutaParqueadero {
    constructor() {
        this.rutaParqueaderoApi = (0, express_1.Router)();
        this.rutaParqueaderoApi.get("/getall", ControladorParqueaderoConsulta_1.default.llamarObtenerTodos);
        this.rutaParqueaderoApi.post("/add", ValidarParqueadero_1.datosParqueaderoCrear, ValidarDatos_1.default.ahora, ControladorParqueaderoCrear_1.default.llamarGrabarParqueadero);
        this.rutaParqueaderoApi.delete("/delete/:codParqueadero", ValidarParqueadero_1.datosParqueaderoBorrar, ValidarDatos_1.default.ahora, ControladorParqueaderoBorrar_1.default.llamarBorrar);
        this.rutaParqueaderoApi.put("/update", ControladorParqueaderoActualizar_1.default.llamarActualizar);
    }
}
const rutaParqueadero = new RutaParqueadero();
exports.default = rutaParqueadero.rutaParqueaderoApi;
