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
const sql_ubicacion_1 = require("../repository/sql_ubicacion");
class ServicioUbicacionBorrar {
    static borrar(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objBorrado;
                const ubica = yield consulta.one(sql_ubicacion_1.SQL_UBICACION.HOW_MANY_COD, [obj.codUbicacion]);
                const parqueos = yield consulta.one(sql_ubicacion_1.SQL_UBICACION.HOW_MANY_PARQUEADEROS, [obj.codUbicacion]);
                if (parqueos.cantidad == 0 && ubica.cantidad == 1) {
                    caso = 2;
                    objBorrado = yield consulta.result(sql_ubicacion_1.SQL_UBICACION.DELETE, [obj.codUbicacion]);
                }
                else {
                    if (ubica.cantidad == 0) {
                        caso = 3;
                    }
                }
                return { caso, objBorrado };
            }))
                .then(({ caso, objBorrado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Ubicacion se encuentra referenciado con uno o mas parqueaderos o ubicaciones" });
                        break;
                    case 2:
                        res.status(200).json({
                            respuesta: "Registro borrado con exito"
                        });
                        break;
                    case 3:
                        res.status(200).json({
                            respuesta: "Ubicacion no existe"
                        });
                        break;
                    default:
                        res.status(200).json(objBorrado);
                }
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Error eliminando el registro" });
            });
        });
    }
}
exports.default = ServicioUbicacionBorrar;
