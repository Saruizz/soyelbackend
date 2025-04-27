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
class ServicioVehiculoCrear {
    static grabarVehiculo(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!obj ||
                    !obj.codTipoVehiculo ||
                    !obj.codUsuario ||
                    !obj.placaVehiculo) {
                    return res.status(400).json({
                        respuesta: "Datos de vehículo inválidos",
                    });
                }
                // Verificar que la placa no exista
                const vehiculoExistente = yield dbConnection_1.default.oneOrNone(sql_vehiculo_1.SQL_VEHICULO.FIND_BY_PLACA, [obj.placaVehiculo]);
                if (vehiculoExistente) {
                    return res.status(409).json({
                        respuesta: "Ya existe un vehículo con esta placa",
                    });
                }
                // Crear el vehículo
                const objGrabado = yield dbConnection_1.default.one(sql_vehiculo_1.SQL_VEHICULO.ADD, [
                    obj.codTipoVehiculo,
                    obj.codUsuario,
                    obj.placaVehiculo,
                ]);
                res.status(201).json({
                    respuesta: "Vehículo creado con éxito",
                    vehiculo: objGrabado
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    respuesta: "Error interno al crear el vehículo",
                    error: error.message
                });
            }
        });
    }
}
exports.default = ServicioVehiculoCrear;
