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
const sql_vehiculo_1 = require("../repository/sql_vehiculo");
class ServicioVeiculoConsulta {
    static obtenerTodos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const misDatos = yield dbConnection_1.default.result(sql_vehiculo_1.SQL_VEHICULO.FIND_ALL);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron vehículos",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de vehículos exitosa",
                    cantidad: misDatos.rows.length,
                    vehiculos: misDatos.rows,
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar vehículos",
                });
            }
        });
    }
    static obtenerPorCodVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codVehiculo } = req.params;
            try {
                const misDatos = yield dbConnection_1.default.result(sql_vehiculo_1.SQL_VEHICULO.FIND_BY_PRIMARY_KEY, [
                    codVehiculo,
                ]);
                if (!misDatos) {
                    return res.status(404).json({
                        respuesta: "No se encontró el vehículo con el código especificado",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de vehículo por código exitosa",
                    cantidad: 1,
                    vehiculo: misDatos.rows,
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar vehículo por código",
                });
            }
        });
    }
    static obtenerPorTipoVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codTipoVehiculo } = req.params;
            try {
                const misDatos = yield dbConnection_1.default.result(sql_vehiculo_1.SQL_VEHICULO.FIND_BY_ID_TIPO_VEHICULO, [codTipoVehiculo]);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron vehículos para el tipo de vehículo especificado",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de vehículos por código tipo vehiculo exitosa",
                    cantidad: misDatos.rows.length,
                    vehiculos: misDatos.rows,
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar vehículos por tipo de vehículo",
                });
            }
        });
    }
    static obtenerPorUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codUsuario } = req.params;
            try {
                const misDatos = yield dbConnection_1.default.result(sql_vehiculo_1.SQL_VEHICULO.FIND_BY_ID_USUARIO, [codUsuario]);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron vehículos para el usuario especificado",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de vehículos por código usuario exitosa",
                    cantidad: misDatos.rows.length,
                    vehiculos: misDatos.rows,
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar vehículos por usuario",
                });
            }
        });
    }
    static obtenerPorPlaca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { placaVehiculo } = req.params;
            try {
                const misDatos = yield dbConnection_1.default.result(sql_vehiculo_1.SQL_VEHICULO.FIND_BY_PLACA, [placaVehiculo]);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontro vehículo para la placa especificada",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de vehículo por placa exitosa",
                    cantidad: misDatos.rows.length,
                    vehiculos: misDatos.rows,
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar vehículos por placa",
                });
            }
        });
    }
}
exports.default = ServicioVeiculoConsulta;
