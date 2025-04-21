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
const sql_turno_1 = require("../repository/sql_turno");
class ServicioTurnoBorrar {
    static borrar(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objBorrado;
                const parqueos = yield consulta.one(sql_turno_1.SQL_TURNO.HOW_MANY_PARQUEADEROS, [obj.codTurno]);
                const turnos = yield consulta.one(sql_turno_1.SQL_TURNO.HOW_MANY_COD, [obj.codTurno]);
                if (turnos.cantidad > 0 && parqueos.cantidad == 0) {
                    caso = 2;
                    objBorrado = yield consulta.result(sql_turno_1.SQL_TURNO.DELETE, [obj.codTurno]);
                }
                else {
                    if (turnos.cantidad == 0) {
                        caso = 3;
                    }
                }
                return { caso, objBorrado };
            }))
                .then(({ caso, objBorrado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Turno se encuentra referenciado" });
                        break;
                    case 2:
                        res.status(200).json({
                            respuesta: "Registro borrado con exito"
                        });
                        break;
                    case 3:
                        res.status(200).json({
                            respuesta: "Turno no existe"
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
exports.default = ServicioTurnoBorrar;
