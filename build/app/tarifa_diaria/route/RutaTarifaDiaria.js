"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorTarifaDiariaConsulta_1 = __importDefault(require("../controller/ControladorTarifaDiariaConsulta"));
const ControladorTarifaDiariaCrear_1 = __importDefault(require("../controller/ControladorTarifaDiariaCrear"));
const ControladorTarifaDiariaBorrar_1 = __importDefault(require("../controller/ControladorTarifaDiariaBorrar"));
const ControladorTarifaDiariaActualizar_1 = __importDefault(require("../controller/ControladorTarifaDiariaActualizar"));
const ValidarTarifaDiaria_1 = require("../../../config/domain/ValidarTarifaDiaria");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class RutaTarifaDiaria {
    constructor() {
        this.rutaTarifaDiariaApi = (0, express_1.Router)();
        this.configurarRutasConsulta();
        this.configurarRutasGestion();
    }
    configurarRutasConsulta() {
        // Obtener todas las tarifas
        this.rutaTarifaDiariaApi.get("/getall", ControladorTarifaDiariaConsulta_1.default.llamaroObtenerTodos);
        // Obtener tarifa por IDs
        this.rutaTarifaDiariaApi.get("/getone/:codParqueadero/:codTipoVehiculo", ValidarTarifaDiaria_1.datosTarifaDiariaVerParamParqueadero, ValidarTarifaDiaria_1.datosTarifaDiariaVerParamTipoVehiculo, ValidarDatos_1.default.ahora, ControladorTarifaDiariaConsulta_1.default.llamarObtenerUno);
        // Obtener tarifas por parqueadero
        this.rutaTarifaDiariaApi.get("/getbyparqueadero/:codParqueadero", ValidarTarifaDiaria_1.datosTarifaDiariaVerParamParqueadero, ValidarDatos_1.default.ahora, ControladorTarifaDiariaConsulta_1.default.llamarObtenerPorParqueadero);
        // Obtener tarifas por tipo de vehículo
        this.rutaTarifaDiariaApi.get("/getbytipovehiculo/:codTipoVehiculo", ValidarTarifaDiaria_1.datosTarifaDiariaVerParamTipoVehiculo, ValidarDatos_1.default.ahora, ControladorTarifaDiariaConsulta_1.default.llamarObtenerPorTipoVehiculo);
    }
    configurarRutasGestion() {
        // Crear nueva tarifa
        this.rutaTarifaDiariaApi.post("/add", ValidarTarifaDiaria_1.datosTarifaDiariaCrear, ValidarDatos_1.default.ahora, ControladorTarifaDiariaCrear_1.default.llamarGrabarTarifaDiaria);
        // Eliminar tarifa
        this.rutaTarifaDiariaApi.delete("/delete/:codParqueadero/:codTipoVehiculo", ValidarTarifaDiaria_1.datosTarifaDiariaVerParamParqueadero, ValidarTarifaDiaria_1.datosTarifaDiariaVerParamTipoVehiculo, ValidarDatos_1.default.ahora, ControladorTarifaDiariaBorrar_1.default.llamarBorrarTarifaDiaria);
        // Actualizar tarifa
        this.rutaTarifaDiariaApi.put("/update", ValidarTarifaDiaria_1.datosTarifaDiariaActualizar, ValidarDatos_1.default.ahora, ControladorTarifaDiariaActualizar_1.default.llamarActualizarTarifaDiaria);
    }
}
const rutaTarifaDiaria = new RutaTarifaDiaria();
exports.default = rutaTarifaDiaria.rutaTarifaDiariaApi;
