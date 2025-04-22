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
class ServicioPuestoActualizar {
    static actualizarPuesto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codPuesto, codParqueadero, codTipoVehiculo, detallePuesto } = req.body;
            try {
                const existePuesto = yield dbConnection_1.default.oneOrNone(sql_puesto_1.SQL_PUESTO.HOW_MANY, [codPuesto]);
                if (existePuesto.cantidad === '0') {
                    return res.status(404).json({
                        respuesta: 'El puesto que intenta actualizar no existe',
                    });
                }
                const puestoActualizado = yield dbConnection_1.default.one(sql_puesto_1.SQL_PUESTO.UPDATE, [codPuesto, codParqueadero, codTipoVehiculo, detallePuesto]);
                const puesto = new Puesto_1.default(puestoActualizado.codpuesto, puestoActualizado.codparqueadero, puestoActualizado.codTipoVehiculo, puestoActualizado.detallePuesto);
                res.status(200).json({
                    respuesta: 'Puesto actualizado correctamente',
                    puestoActualizado: puesto,
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: 'Error interno al actualizar el puesto',
                });
            }
        });
    }
}
exports.default = ServicioPuestoActualizar;
