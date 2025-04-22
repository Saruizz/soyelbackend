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
const sql_puesto_1 = require("../repository/sql_puesto");
const Puesto_1 = __importDefault(require("../model/Puesto"));
class ServicioPuestoConsulta {
    //obtener todas los puestos diarios
    static obtenerTodos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const misDatos = yield dbConnection_1.default.result(sql_puesto_1.SQL_PUESTO.FIND_ALL);
                if (misDatos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron puestos",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de puestos exitosa",
                    cantidad: misDatos.rows.length,
                    puestos: misDatos.rows
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar puestos",
                });
            }
        });
    }
    // Obtener un puesto específico por su clave primaria
    static obtenerUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codParqueadero, codPuesto } = req.params;
            try {
                const miDato = yield dbConnection_1.default.oneOrNone(sql_puesto_1.SQL_PUESTO.FIND_BY_PRIMARY_KEY, [codParqueadero, codPuesto]);
                if (!miDato) {
                    return res.status(404).json({
                        respuesta: "No se encontró el puesto solicitado",
                    });
                }
                // Crear una instancia de la entidad con los datos obtenidos
                const puesto = new Puesto_1.default(miDato.codpuesto, miDato.codparqueadero, miDato.codtipovehiculo, miDato.estado);
                res.status(200).json({
                    respuesta: "Consulta de puesto exitosa",
                    cantidad: 1,
                    puesto: miDato
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al consultar el puesto",
                });
            }
        });
    }
}
exports.default = ServicioPuestoConsulta;
