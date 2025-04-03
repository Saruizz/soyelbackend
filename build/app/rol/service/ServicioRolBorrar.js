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
const sql_rol_1 = require("../repository/sql_rol");
class ServicioRolBorrar {
    static borrar(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existeRegistro = yield dbConnection_1.default.oneOrNone(sql_rol_1.SQL_ROL.FIND_BY_ID, [obj.codRol]);
                if (!existeRegistro) {
                    return res.status(404).json({
                        respuesta: "El rol no existe"
                    });
                }
                const respuesta = yield dbConnection_1.default.result(sql_rol_1.SQL_ROL.DELETE, [obj.codRol]);
                if (respuesta.rowCount === 0) {
                    return res.status(400).json({
                        respuesta: "No se pudo eliminar el registro de rol"
                    });
                }
                res.status(200).json({
                    respuesta: "Rol eliminado correctamente",
                    "Filas borradas": respuesta.rowCount,
                });
            }
            catch (miError) {
                console.error(miError);
                res.status(500).json({
                    respuesta: "Error interno al intentar eliminar el rol"
                });
            }
        });
    }
}
exports.default = ServicioRolBorrar;
