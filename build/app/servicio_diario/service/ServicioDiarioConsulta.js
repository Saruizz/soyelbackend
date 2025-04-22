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
class ServicioDiarioConsulta {
    // Obtener todos los servicios diarios
    static obtenerTodos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const misDatos = yield dbConnection_1.default.result(sql_servicio_diario_1.SQL_SERVICIO_DIARIO.FIND_ALL);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron servicios diarios",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de servicios diarios exitosa",
                    cantidad: misDatos.rows.length,
                    serviciosDiarios: misDatos.rows
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar servicios diarios",
                });
            }
        });
    }
    // Obtener un servicio diario específico por su clave primaria
    static obtenerUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod_servicio_diario } = req.params;
            try {
                const miDato = yield dbConnection_1.default.oneOrNone(sql_servicio_diario_1.SQL_SERVICIO_DIARIO.FIND_BY_PRIMARY_KEY, [cod_servicio_diario]);
                if (!miDato) {
                    return res.status(404).json({
                        respuesta: "No se encontró el servicio diario solicitado",
                    });
                }
                // Crear una instancia de la entidad con los datos obtenidos
                const servicioDiario = new ServicioDiario_1.default(miDato.cod_servicio_diario, miDato.cod_parqueadero, miDato.cod_tipo_vehiculo, miDato.fecha_servicio, miDato.hora_ingreso, miDato.hora_salida, miDato.valor_total_servicio);
                res.status(200).json({
                    respuesta: "Consulta de servicio diario exitosa",
                    cantidad: 1,
                    servicioDiario: miDato
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar servicio diario",
                });
            }
        });
    }
    //Obtener servicio diario por el codigo de servicio
    static obtenerPorCodigoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod_servicio_diario } = req.params;
            try {
                const misDatos = yield dbConnection_1.default.result(sql_servicio_diario_1.SQL_SERVICIO_DIARIO.FIND_BY_PRIMARY_KEY, [cod_servicio_diario]);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron servicios diarios",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de servicios diarios exitosa",
                    cantidad: misDatos.rows.length,
                    serviciosDiarios: misDatos.rows
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar servicios diarios",
                });
            }
        });
    }
}
exports.default = ServicioDiarioConsulta;
