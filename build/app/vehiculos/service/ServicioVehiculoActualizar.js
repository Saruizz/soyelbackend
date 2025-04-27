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
class ServicioVehiculoActualizar {
    static actualizarVehiculo(objVehiculo, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!objVehiculo ||
                    !objVehiculo.codVehiculo ||
                    !objVehiculo.codTipoVehiculo ||
                    !objVehiculo.codUsuario ||
                    !objVehiculo.placaVehiculo) {
                    return res.status(400).json({
                        respuesta: "Datos de vehículo inválidos",
                    });
                }
                // Verificar que el vehículo existe
                const vehiculoExistente = yield dbConnection_1.default.oneOrNone(sql_vehiculo_1.SQL_VEHICULO.FIND_BY_PRIMARY_KEY, [objVehiculo.codVehiculo]);
                if (!vehiculoExistente) {
                    return res.status(404).json({
                        respuesta: "El vehículo no existe",
                    });
                }
                // Verificar si la nueva placa existe en otro vehículo (excepto en el actual)
                if (vehiculoExistente.placavehiculo !== objVehiculo.placaVehiculo) {
                    const placaExistente = yield dbConnection_1.default.oneOrNone(sql_vehiculo_1.SQL_VEHICULO.FIND_BY_PLACA, [objVehiculo.placaVehiculo]);
                    if (placaExistente && placaExistente.codvehiculo !== objVehiculo.codVehiculo) {
                        return res.status(409).json({
                            respuesta: "Ya existe un vehículo con esta placa",
                        });
                    }
                }
                const resultado = yield dbConnection_1.default.oneOrNone(sql_vehiculo_1.SQL_VEHICULO.UPDATE, [
                    objVehiculo.codVehiculo,
                    objVehiculo.codTipoVehiculo,
                    objVehiculo.codUsuario,
                    objVehiculo.placaVehiculo,
                ]);
                if (!resultado) {
                    return res.status(500).json({
                        respuesta: "No se pudo actualizar el vehículo",
                    });
                }
                res.status(200).json({
                    respuesta: "Vehículo actualizado correctamente",
                    vehiculo: resultado
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al actualizar el vehículo",
                    error: miError.message
                });
            }
        });
    }
}
exports.default = ServicioVehiculoActualizar;
