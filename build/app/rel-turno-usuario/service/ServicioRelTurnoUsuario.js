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
const sql_rel_turno_usuario_1 = require("../repository/sql_rel_turno_usuario");
class ServicioRelTurnoUsuario {
    static crearRelacion(codTurno, codUsuario, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield dbConnection_1.default.one(sql_rel_turno_usuario_1.SQL_REL_TURNO_USUARIO.INSERT, [codTurno, codUsuario]);
                res.status(201).json({ respuesta: "Relación creada", codTurnoUsuario: resultado.cod_turnousuario });
            }
            catch (error) {
                console.error("Error al crear relación:", error);
                res.status(500).json({ respuesta: "Error en el servidor" });
            }
        });
    }
    static eliminarRelacion(codTurnoUsuario, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConnection_1.default.none(sql_rel_turno_usuario_1.SQL_REL_TURNO_USUARIO.DELETE, [codTurnoUsuario]);
                res.status(200).json({ respuesta: "Relación eliminada" });
            }
            catch (error) {
                console.error("Error al eliminar relación:", error);
                res.status(500).json({ respuesta: "Error en el servidor" });
            }
        });
    }
    static obtenerRelacionPorId(codTurnoUsuario, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield dbConnection_1.default.oneOrNone(sql_rel_turno_usuario_1.SQL_REL_TURNO_USUARIO.FIND_BY_ID, [codTurnoUsuario]);
                if (resultado) {
                    res.status(200).json(resultado);
                }
                else {
                    res.status(404).json({ respuesta: "Relación no encontrada" });
                }
            }
            catch (error) {
                console.error("Error al obtener relación:", error);
                res.status(500).json({ respuesta: "Error en el servidor" });
            }
        });
    }
    static obtenerTodasLasRelaciones(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultados = yield dbConnection_1.default.manyOrNone(sql_rel_turno_usuario_1.SQL_REL_TURNO_USUARIO.FIND_ALL);
                res.status(200).json(resultados);
            }
            catch (error) {
                console.error("Error al obtener relaciones:", error);
                res.status(500).json({ respuesta: "Error en el servidor" });
            }
        });
    }
    static actualizarRelacion(codTurnoUsuario, codTurno, codUsuario, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConnection_1.default.none(sql_rel_turno_usuario_1.SQL_REL_TURNO_USUARIO.UPDATE, [codTurno, codUsuario, codTurnoUsuario]);
                res.status(200).json({ respuesta: "Relación actualizada" });
            }
            catch (error) {
                console.error("Error al actualizar relación:", error);
                res.status(500).json({ respuesta: "Error en el servidor" });
            }
        });
    }
}
exports.default = ServicioRelTurnoUsuario;
