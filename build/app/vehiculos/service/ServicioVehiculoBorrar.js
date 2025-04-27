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
const sql_vehiculo_1 = require("../repository/sql_vehiculo");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class ServicioVehiculoBorrar {
    static borrarVehiculo(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiculoExistente = yield dbConnection_1.default.oneOrNone(sql_vehiculo_1.SQL_VEHICULO.FIND_BY_PRIMARY_KEY, [obj.codVehiculo]);
                if (!vehiculoExistente) {
                    return res.status(404).json({
                        respuesta: "El vehículo no existe",
                    });
                }
                const resultado = yield dbConnection_1.default.result(sql_vehiculo_1.SQL_VEHICULO.DELETE, [
                    obj.codVehiculo,
                ]);
                if (resultado.rowCount === 0) {
                    return res.status(500).json({
                        respuesta: "No se pudo eliminar el vehículo",
                    });
                }
                res.status(200).json({
                    respuesta: "Vehículo eliminado correctamente",
                    detalles: {
                        filasEliminadas: resultado.rowCount,
                        vehiculoEliminado: {
                            codVehiculo: obj.codVehiculo,
                            placaVehiculo: vehiculoExistente.placavehiculo,
                        },
                    },
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al eliminar el vehículo"
                });
            }
        });
    }
}
exports.default = ServicioVehiculoBorrar;
