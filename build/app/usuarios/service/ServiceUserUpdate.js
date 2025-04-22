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
const dbConnetions_1 = __importDefault(require("../../../config/connection/dbConnetions"));
const sql_user_1 = require("../repository/sql_user");
class ServiceUserUpdate {
    static updateUser(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const usuarios = yield consulta.oneOrNone(sql_user_1.sql_usuarios.FIND_BY_ID, [obj.codUsuario]);
                if (usuarios == null) {
                    res.status(400).json({ respuesta: "No se encuentra registrado este usuario" });
                }
                else {
                    yield consulta.none(sql_user_1.sql_usuarios.UPDATE, [
                        obj.codRol,
                        obj.documentoUsuario,
                        obj.nombresUsuario,
                        obj.apellidosUsuario,
                        obj.generoUsuario,
                        obj.fechaNacimientoUsuario,
                        obj.telefonoUsuario,
                        obj.codUsuario,
                    ]);
                }
            }))
                .then(() => res.status(200).json({ respuesta: "Usuario actualizado correctamente" }))
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Error al actualizar usuario" });
            });
        });
    }
}
exports.default = ServiceUserUpdate;
