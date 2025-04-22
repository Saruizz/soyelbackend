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
                    !obj.placaVehiculo ||
                    !obj.codTipoVehiculo ||
                    !obj.codUsuario) {
                    return res.status(400).json({
                        respuesta: "Datos de vehículo inválidos",
                    });
                }
                const resultado = yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                    const vehiculos = yield consulta.one(sql_vehiculo_1.SQL_VEHICULO.HOW_MANY, [
                        obj.placaVehiculo,
                    ]);
                    if (vehiculos.cantidad > 0) {
                        return { caso: 1 };
                    }
                    const objGrabado = yield consulta.one(sql_vehiculo_1.SQL_VEHICULO.ADD, [
                        obj.codTipoVehiculo,
                        obj.codUsuario,
                        obj.placaVehiculo,
                    ]);
                    return { caso: 2, objGrabado };
                }));
                switch (resultado.caso) {
                    case 1:
                        // Vehículo ya existe
                        return res.status(409).json({
                            respuesta: "El vehículo ya existe",
                        });
                    case 2:
                        // Vehículo creado exitosamente
                        return res.status(201).json(resultado.objGrabado);
                    default:
                        // Caso inesperado
                        return res.status(500).json({
                            respuesta: "Error inesperado al crear vehículo",
                        });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    respuesta: "Error interno al crear el vehículo",
                });
            }
        });
    }
}
exports.default = ServicioVehiculoCrear;
