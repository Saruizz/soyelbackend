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
const sql_tipo_vehiculo_1 = require("../repository/sql_tipo_vehiculo");
class ServicioTipoVehiculoActualizar {
    static actualizarTipoVehiculo(objTipoVehiculo, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!objTipoVehiculo ||
                    !objTipoVehiculo.codTipoVehiculo ||
                    !objTipoVehiculo.claseTipoVehiculo) {
                    return res.status(400).json({
                        respuesta: "Datos de tipo de vehículo inválidos",
                    });
                }
                const tipoVehiculoExistente = yield dbConnection_1.default.oneOrNone(sql_tipo_vehiculo_1.SQL_TIPO_VEHICULO.FIND_BY_ID, [objTipoVehiculo.codTipoVehiculo]);
                if (!tipoVehiculoExistente) {
                    return res.status(404).json({
                        respuesta: "El tipo de vehículo no existe",
                    });
                }
                const tiposVehiculos = yield dbConnection_1.default.one(sql_tipo_vehiculo_1.SQL_TIPO_VEHICULO.HOW_MANY, [
                    objTipoVehiculo.claseTipoVehiculo,
                ]);
                if (tiposVehiculos.cantidad > 0) {
                    return res.status(409).json({
                        respuesta: "Ya existe un tipo de vehículo con este nombre",
                    });
                }
                const resultado = yield dbConnection_1.default.result(sql_tipo_vehiculo_1.SQL_TIPO_VEHICULO.UPDATE, [
                    objTipoVehiculo.claseTipoVehiculo,
                    objTipoVehiculo.codTipoVehiculo,
                ]);
                if (resultado.rowCount === 0) {
                    return res.status(500).json({
                        respuesta: "No se pudo actualizar el tipo de vehículo",
                    });
                }
                res.status(200).json({
                    respuesta: "Tipo de vehículo actualizado correctamente",
                    detalles: {
                        filasActualizadas: resultado.rowCount,
                        codigoTipoVehiculo: objTipoVehiculo.codTipoVehiculo,
                        nuevoNombre: objTipoVehiculo.claseTipoVehiculo,
                    },
                });
            }
            catch (miError) {
                console.error(miError);
                res.status(500).json({
                    respuesta: "Error interno al actualizar el tipo de vehículo",
                });
            }
        });
    }
}
exports.default = ServicioTipoVehiculoActualizar;
