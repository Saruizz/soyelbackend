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
class ServicioRolActualizar {
    static actualizarRol(objRol, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!objRol || !objRol.codRol || !objRol.nombreRol) {
                    return res.status(400).json({
                        respuesta: "Datos de rol inválidos"
                    });
                }
                const rolExistente = yield dbConnection_1.default.oneOrNone(sql_rol_1.SQL_ROL.FIND_BY_ID, [objRol.codRol]);
                if (!rolExistente) {
                    return res.status(404).json({
                        respuesta: "El rol no existe"
                    });
                }
                const rolesConMismoNombre = yield dbConnection_1.default.one(sql_rol_1.SQL_ROL.HOW_MANY, [objRol.nombreRol]);
                if (rolesConMismoNombre.cantidad > 0) {
                    return res.status(409).json({
                        respuesta: "Ya existe un rol con este nombre"
                    });
                }
                const resultado = yield dbConnection_1.default.result(sql_rol_1.SQL_ROL.UPDATE, [
                    objRol.nombreRol,
                    objRol.codRol
                ]);
                if (resultado.rowCount === 0) {
                    return res.status(500).json({
                        respuesta: "No se pudo actualizar el rol"
                    });
                }
                res.status(200).json({
                    respuesta: "Rol actualizado correctamente",
                    detalles: {
                        filasActualizadas: resultado.rowCount,
                        codigoRol: objRol.codRol,
                        nuevoNombre: objRol.nombreRol
                    }
                });
            }
            catch (miError) {
                console.error(miError);
                res.status(500).json({
                    respuesta: "Error interno al actualizar el rol"
                });
            }
        });
    }
}
exports.default = ServicioRolActualizar;
