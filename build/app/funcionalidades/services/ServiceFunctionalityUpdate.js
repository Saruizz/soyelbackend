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
const sql_functionality_1 = require("../repository/sql_functionality");
class ServiceFunctionalityUpdate {
    static update(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                const functionality = yield consulta.oneOrNone(sql_functionality_1.sql_functionality.getById, [obj.codFuncionalidad]);
                if (!functionality) {
                    caso = 2;
                }
                else {
                    yield consulta.none(sql_functionality_1.sql_functionality.update, [obj.codFuncionalidad, obj.codPadreFuncionalidad, obj.nombreFuncionalidad, obj.urlFuncionalidad]);
                }
                return { caso, obj };
            }))
                .then(({ caso, obj }) => {
                switch (caso) {
                    case 2:
                        res.status(400).json({
                            respuesta: "La funcionalidad no existe en la base de datos",
                            detalle: obj,
                        });
                        break;
                    default:
                        res.status(200).json({
                            respuesta: "Funcionalidad actualizada correctamente",
                            detalle: obj,
                        });
                        break;
                }
            })
                .catch((error) => {
                console.log(error);
                res.status(400).json({
                    respuesta: "Error al actualizar la funcionalidad",
                    detalle: error.message,
                    error: error,
                });
            });
        });
    }
}
exports.default = ServiceFunctionalityUpdate;
