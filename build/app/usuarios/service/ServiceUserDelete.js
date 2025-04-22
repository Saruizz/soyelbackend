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
const sql_user_1 = require("../repository/sql_user");
const sql_ingreso_1 = __importDefault(require("../../ingresos/repository/sql_ingreso"));
const sql_accesos_1 = require("../../accesos/repository/sql_accesos");
class ServiceUserDelete {
    static eliminarUsuario(codUsuario, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const usuarios = yield consulta.oneOrNone(sql_user_1.sql_usuarios.FIND_BY_ID, [codUsuario]);
                if (usuarios == null) {
                    res.status(400).json({ respuesta: "No se encuentra registrado este usuario" });
                }
                else {
                    yield consulta.none(sql_user_1.sql_usuarios.DELETE, [codUsuario]);
                    const ingresos = yield consulta.any(sql_ingreso_1.default.GETUSERBYID, [codUsuario]);
                    for (const ingreso of ingresos) {
                        yield consulta.none(sql_ingreso_1.default.DELETE, [ingreso.codIngreso]);
                    }
                    const accesos = yield consulta.any(sql_accesos_1.sql_accesos.getByUserId, [codUsuario]);
                    for (const acceso of accesos) {
                        yield consulta.none(sql_accesos_1.sql_accesos.delete, [acceso.codAcceso]);
                    }
                }
            }))
                .then(() => res.status(200).json({ respuesta: "Usuario eliminado correctamente" }))
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Error al eliminar usuario" });
            });
        });
    }
}
exports.default = ServiceUserDelete;
