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
class ServicioPuestoCrear {
    static grabarPuesto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codPuesto, codParqueadero, codTipoVehiculo, detallePuesto } = req.body;
            // Validar que el puesto no exista
            const existePuesto = yield dbConnection_1.default.oneOrNone(sql_puesto_1.SQL_PUESTO.HOW_MANY, [codPuesto, codParqueadero, codTipoVehiculo]);
            if (existePuesto.cantidad !== "0") {
                return res.status(400).json({
                    respuesta: "Ya existe un puesto con ese código para este parqueadero y tipo de vehículo",
                });
            }
            try {
                const nuevoPuesto = yield dbConnection_1.default.one(sql_puesto_1.SQL_PUESTO.ADD, [codPuesto, codParqueadero, codTipoVehiculo, detallePuesto]);
                const puesto = new Puesto_1.default(nuevoPuesto.codpuesto, nuevoPuesto.codparqueadero, nuevoPuesto.codtipovehiculo, nuevoPuesto.detallepuesto);
                res.status(201).json({
                    respuesta: "Puesto creado correctamente",
                    nuevoPuesto: nuevoPuesto
                });
            }
            catch (error) {
                console.log(error);
                if (error.code === '23503') { // Código de PostgreSQL para violación de clave foránea
                    return res.status(400).json({
                        respuesta: "Error al crear el puesto. Verifique que el parqueadero y el tipo de vehículo existan.",
                        detalleError: error.detail
                    });
                }
                return res.status(500).json({
                    respuesta: "Error interno al crear el puesto",
                    error: error.message
                });
            }
        });
    }
}
exports.default = ServicioPuestoCrear;
