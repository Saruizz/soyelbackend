"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControladorTurnoConsulta_1 = __importDefault(require("../controller/ControladorTurnoConsulta"));
const ValidarTuno_1 = require("../../../config/domain/ValidarTuno");
const ControladorTurnoCrear_1 = __importDefault(require("../controller/ControladorTurnoCrear"));
const ControladorTurnoBorrar_1 = __importDefault(require("../controller/ControladorTurnoBorrar"));
const ControladorTurnoActualizar_1 = __importDefault(require("../controller/ControladorTurnoActualizar"));
class RutaTurno {
    constructor() {
        this.rutaTurnoApi = (0, express_1.Router)();
        this.rutaTurnoApi.get("/getall", ControladorTurnoConsulta_1.default.llamarObtenerTodos);
        this.rutaTurnoApi.post("/add", ValidarTuno_1.datosTurnoCrear, ValidarDatos_1.default.ahora, ControladorTurnoCrear_1.default.llamarGrabarTurno);
        this.rutaTurnoApi.delete("/delete/:codTurno", ValidarTuno_1.datosTurnoBorrar, ValidarDatos_1.default.ahora, ControladorTurnoBorrar_1.default.llamarBorrar);
        this.rutaTurnoApi.put("/update", ControladorTurnoActualizar_1.default.llamarActualizar);
    }
}
const rutaTurno = new RutaTurno();
exports.default = rutaTurno.rutaTurnoApi;
