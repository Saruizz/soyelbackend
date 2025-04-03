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
const sql_rol_1 = require("../repository/sql_rol");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class ServicioRolCrear {
    static grabarRol(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!obj || !obj.nombreRol) {
                    return res.status(400).json({
                        respuesta: "Datos de rol inválidos"
                    });
                }
                const verificacionRol = yield dbConnection_1.default.one(sql_rol_1.SQL_ROL.HOW_MANY, [obj.nombreRol]);
                if (verificacionRol.cantidad > 0) {
                    return res.status(409).json({
                        respuesta: "Ya existe un rol con este nombre"
                    });
                }
                const rolCreado = yield dbConnection_1.default.one(sql_rol_1.SQL_ROL.ADD, [obj.nombreRol]);
                res.status(201).json({
                    respuesta: "Rol creado exitosamente",
                    detalles: {
                        codigoRol: rolCreado.cod_rol,
                        nombreRol: obj.nombreRol
                    }
                });
            }
            catch (miError) {
                console.error(miError);
                res.status(500).json({
                    respuesta: "Error interno al crear rol"
                });
            }
        });
    }
}
exports.default = ServicioRolCrear;
