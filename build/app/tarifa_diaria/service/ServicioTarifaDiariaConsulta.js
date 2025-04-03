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
const sql_tarifa_diaria_1 = require("../repository/sql_tarifa_diaria");
const TarifaDiaria_1 = __importDefault(require("../model/TarifaDiaria"));
class ServicioTarifaDiariaConsulta {
    // Obtener todas las tarifas diarias
    static obtenerTodos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const misDatos = yield dbConnection_1.default.result(sql_tarifa_diaria_1.SQL_TARIFA_DIARIA.FIND_ALL);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron tarifas diarias",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de tarifas diarias exitosa",
                    cantidad: misDatos.rows.length,
                    tarifasDiarias: misDatos.rows
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar tarifas diarias",
                });
            }
        });
    }
    // Obtener una tarifa diaria específica por su clave primaria
    static obtenerUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codParqueadero, codTipoVehiculo } = req.params;
            try {
                const miDato = yield dbConnection_1.default.oneOrNone(sql_tarifa_diaria_1.SQL_TARIFA_DIARIA.FIND_BY_PRIMARY_KEY, [codParqueadero, codTipoVehiculo]);
                if (!miDato) {
                    return res.status(404).json({
                        respuesta: "No se encontró la tarifa diaria solicitada",
                    });
                }
                // Crear una instancia de la entidad con los datos obtenidos
                const tarifaDiaria = new TarifaDiaria_1.default(miDato.codparqueadero, miDato.codtipovehiculo, miDato.valortarifadiaria);
                res.status(200).json({
                    respuesta: "Consulta de tarifa diaria exitosa",
                    cantidad: 1,
                    tarifaDiaria: miDato
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar la tarifa diaria",
                });
            }
        });
    }
    // Obtener tarifas diarias por código de parqueadero
    static obtenerPorParqueadero(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codParqueadero } = req.params;
            try {
                const misDatos = yield dbConnection_1.default.result(sql_tarifa_diaria_1.SQL_TARIFA_DIARIA.FIND_BY_ID_PARQUEADERO, [codParqueadero]);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron tarifas diarias para el parqueadero especificado",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de tarifas diarias por código de parqueadero exitosa",
                    cantidad: misDatos.rows.length,
                    tarifasDiarias: misDatos.rows
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar tarifas diarias por parqueadero",
                });
            }
        });
    }
    // Obtener tarifas diarias por código de tipo de vehículo
    static obtenerPorTipoVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codTipoVehiculo } = req.params;
            try {
                const misDatos = yield dbConnection_1.default.result(sql_tarifa_diaria_1.SQL_TARIFA_DIARIA.FIND_BY_ID_TIPO_VEHICULO, [codTipoVehiculo]);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron tarifas diarias para el tipo de vehículo especificado",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de tarifas diarias por código tipo vehiculo exitosa",
                    cantidad: misDatos.rows.length,
                    tarifasDiarias: misDatos.rows
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar tarifas diarias por tipo de vehículo",
                });
            }
        });
    }
}
exports.default = ServicioTarifaDiariaConsulta;
