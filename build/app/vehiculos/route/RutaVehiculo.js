"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorVehiculoConsulta_1 = __importDefault(require("../controller/ControladorVehiculoConsulta"));
const ControladorVehiculoCrear_1 = __importDefault(require("../controller/ControladorVehiculoCrear"));
const ControladorVehiculoActualizar_1 = __importDefault(require("../controller/ControladorVehiculoActualizar"));
const ControladorVehiculoBorrar_1 = __importDefault(require("../controller/ControladorVehiculoBorrar"));
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ValidarVehiculo_1 = require("../../../config/domain/ValidarVehiculo");
class RutaVehiculo {
    constructor() {
        this.rutaVehiculoApi = (0, express_1.Router)();
        this.configurararRutasConsulta();
        this.configurararRutasGestion();
    }
    configurararRutasConsulta() {
        this.rutaVehiculoApi.get("/getall", ControladorVehiculoConsulta_1.default.llamarObtenerTodos);
        this.rutaVehiculoApi.get("/getone/:codVehiculo", ValidarVehiculo_1.datosVehiculoConsultarPorId, ValidarDatos_1.default.ahora, ControladorVehiculoConsulta_1.default.llamarObtenerPorCodVehiculo);
        this.rutaVehiculoApi.get("/getbytipovehiculo/:codTipoVehiculo", ValidarVehiculo_1.datosVehiculoConsultarPorTipo, ValidarDatos_1.default.ahora, ControladorVehiculoConsulta_1.default.llamarObtenerPorTipoVehiculo);
        this.rutaVehiculoApi.get("/getbyusuario/:codUsuario", ValidarVehiculo_1.datosVehiculoConsultarPorUsuario, ValidarDatos_1.default.ahora, ControladorVehiculoConsulta_1.default.llamarObtenerPorUsuario);
        this.rutaVehiculoApi.get("/getbyplaca/:placaVehiculo", ValidarVehiculo_1.datosVehiculoConsultarPorPlaca, ValidarDatos_1.default.ahora, ControladorVehiculoConsulta_1.default.llamarObtenerPorPlaca);
    }
    configurararRutasGestion() {
        this.rutaVehiculoApi.post("/add", ValidarVehiculo_1.datosVehiculoCrear, ValidarDatos_1.default.ahora, ControladorVehiculoCrear_1.default.llamarGrabarVehiculo);
        this.rutaVehiculoApi.put("/update", ValidarVehiculo_1.datosVehiculoActualizar, ValidarDatos_1.default.ahora, ControladorVehiculoActualizar_1.default.llamarActualizarVehiculo);
        this.rutaVehiculoApi.delete("/delete/:codVehiculo", ValidarVehiculo_1.datosVehiculoBorrar, ValidarDatos_1.default.ahora, ControladorVehiculoBorrar_1.default.llamarBorrarVehiculo);
    }
}
const rutaVehiculo = new RutaVehiculo();
exports.default = rutaVehiculo.rutaVehiculoApi;
