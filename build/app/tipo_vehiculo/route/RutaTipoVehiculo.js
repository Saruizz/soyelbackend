"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorTipoVehiculoConsulta_1 = __importDefault(require("../controller/ControladorTipoVehiculoConsulta"));
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControladorTipoVehiculoCrear_1 = __importDefault(require("../controller/ControladorTipoVehiculoCrear"));
const ValidarTipoVehiculo_1 = require("../../../config/domain/ValidarTipoVehiculo");
const ControladorTipoVehiculoBorrar_1 = __importDefault(require("../controller/ControladorTipoVehiculoBorrar"));
const ControladorTipoVehiculoActualizar_1 = __importDefault(require("../controller/ControladorTipoVehiculoActualizar"));
class RutaTipoVehiculo {
    constructor() {
        this.rutaTipoVehiculoApi = (0, express_1.Router)();
        this.rutaTipoVehiculoApi.get("/getall", ControladorTipoVehiculoConsulta_1.default.llamarObtenerTodos);
        this.rutaTipoVehiculoApi.post("/add", ValidarTipoVehiculo_1.datosTipoVehiculoCrear, ValidarDatos_1.default.ahora, ControladorTipoVehiculoCrear_1.default.llamarGrabarTipoVehiculo);
        this.rutaTipoVehiculoApi.delete("/delete/:codTipoVehiculo", ValidarTipoVehiculo_1.datosTipoVehiculoBorrar, ValidarDatos_1.default.ahora, ControladorTipoVehiculoBorrar_1.default.llamarBorrar);
        this.rutaTipoVehiculoApi.put("/update", ValidarTipoVehiculo_1.datosTipoVehiculoActualizar, ValidarDatos_1.default.ahora, ControladorTipoVehiculoActualizar_1.default.llamarActualizar);
    }
}
const rutaTipoVehiculo = new RutaTipoVehiculo();
exports.default = rutaTipoVehiculo.rutaTipoVehiculoApi;
