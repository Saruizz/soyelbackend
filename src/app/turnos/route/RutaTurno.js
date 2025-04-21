"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
console.log("📌 RutaTurno.js se ha cargado");
const ControladorTurnoConsulta_1 = __importDefault(require("../controller/ControladorTurnoConsulta"));
const ControladorTurnoCrear_1 = __importDefault(require("../controller/ControladorTurnoCrear"));
const ValidarTurno_1 = require("../../../config/domain/ValidarTurno");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControladorTurnoBorrar_1 = __importDefault(require("../controller/ControladorTurnoBorrar"));
const ControladorTurnoActualizar_1 = __importDefault(require("../controller/ControladorTurnoActualizar"));

class RutaTurno {
    constructor() {
        this.rutaTurnoApi = (0, express_1.Router)();
        console.log("📌 Configurando rutas de turnos...");
        this.rutaTurnoApi.get("/getall", ControladorTurnoConsulta_1.default.llamarObtenerTodos);
        this.rutaTurnoApi.post("/add", ValidarTurno_1.datosTurnoCrear, ValidarDatos_1.default.ahora, ControladorTurnoCrear_1.default.llamarGrabarTurno);
        this.rutaTurnoApi.delete("/delete/:cod_turno", ValidarDatos_1.default.ahora, ControladorTurnoBorrar_1.default.llamarBorrar);
        this.rutaTurnoApi.put("/update", ValidarTurno_1.datosTurnoActualizar, ValidarDatos_1.default.ahora, ControladorTurnoActualizar_1.default.llamarActualizar);
    }
}
;
const rutaTurno = new RutaTurno();
exports.default = rutaTurno.rutaTurnoApi;