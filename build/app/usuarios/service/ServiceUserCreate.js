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
const dbConnetions_1 = __importDefault(require("../../../config/connection/dbConnection"));
const sql_user_1 = require("../repository/sql_user");
class ServicioUsuarioCrear {
    static grabarUsuario(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objGrabado;
                const usuarios = yield consulta.one(sql_user_1.sql_usuarios.HOW_MANY, [obj.documentoUsuario]);
                if (usuarios.cantidad == 0) {
                    caso = 2;
                    objGrabado = yield consulta.one(sql_user_1.sql_usuarios.ADD, [
                        obj.codRol,
                        obj.documentoUsuario,
                        obj.nombresUsuario,
                        obj.apellidosUsuario,
                        obj.generoUsuario,
                        obj.fechaNacimientoUsuario,
                        obj.telefonoUsuario,
                    ]);
                }
                return { caso, objGrabado };
            }))
                .then(({ caso, objGrabado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Ya se encuentra registrado ese documento de usuario" });
                        break;
                    default:
                        res.status(200).json({ objGrabado });
                        break;
                }
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Error al registrar usuario" });
            });
        });
    }
}
exports.default = ServicioUsuarioCrear;
