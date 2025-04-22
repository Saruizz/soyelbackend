"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
const sql_servicio_diario_1 = require("../repository/sql_servicio_diario");
const ServicioDiario_1 = __importDefault(require("../model/ServicioDiario"));
class ServicioDiarioCrear {
    static grabarServicioDiario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codServicioDiario, codParqueadero, codVehiculo, codPuesto, fechaInicioServicioDiario, fechaFinServicioDiario, valorServicioDiario } = req.body;
            try {
                const existeServicioDiario = yield dbConnection_1.default.oneOrNone(sql_servicio_diario_1.SQL_SERVICIO_DIARIO.HOW_MANY, [codServicioDiario]);
                if (existeServicioDiario.cantidad !== "0") {
                    return res.status(400).json({
                        respuesta: "Ya existe un servicio diario para este vehículo",
                    });
                }
                const nuevoServicio = yield dbConnection_1.default.one(sql_servicio_diario_1.SQL_SERVICIO_DIARIO.ADD, [codServicioDiario, codParqueadero, codVehiculo, codPuesto, fechaInicioServicioDiario, fechaFinServicioDiario, valorServicioDiario]);
                const servicioDiario = new ServicioDiario_1.default(nuevoServicio.codserviciodiario, nuevoServicio.codparqueadero, nuevoServicio.codvehiculo, nuevoServicio.codpuesto, nuevoServicio.fechainicioserviciodiario, nuevoServicio.fechafinserviciodiario, nuevoServicio.valorserviciodiario);
                res.status(201).json({
                    respuesta: "Servicio diario creado correctamente",
                    nuevoServicio: servicioDiario
                });
            }
            catch (error) {
                console.log(error);
                if (error.code === '23503') { // Código de PostgreSQL para violación de clave foránea
                    return res.status(400).json({
                        respuesta: "Error al crear el servicio diario. Verifique que el parqueadero y el vehículo existan.",
                        detalleError: error.detail
                    });
                }
                return res.status(500).json({
                    respuesta: "Error interno al crear el servicio diario",
                    error: error.message
                });
            }
        });
    }
}
exports.default = ServicioDiarioCrear;
