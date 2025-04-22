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
const sql_rel_rol_funcionalidad_1 = __importDefault(require("../repository/sql_rel_rol_funcionalidad"));
class ServiceGetRelRolFunctionality {
    static getAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                const rel_rol_functionality = yield consulta.any(sql_rel_rol_funcionalidad_1.default.getAll);
                if (!rel_rol_functionality) {
                    caso = 2;
                }
                return { caso, rel_rol_functionality };
            })).then(({ caso, rel_rol_functionality }) => {
                if (caso == 1) {
                    res.status(200).json({
                        respuesta: "Relaciones de rol con funcionalidades obtenidas correctamente",
                        detalle: rel_rol_functionality
                    });
                }
                else {
                    res.status(400).json({
                        respuesta: "No se encontraron relaciones de rol con funcionalidades"
                    });
                }
            }).catch((error) => {
                console.log(error);
                res.status(400).json({
                    respuesta: "Error al obtener las relaciones de rol con funcionalidades",
                    detalle: error.message
                });
            });
        });
    }
}
exports.default = ServiceGetRelRolFunctionality;
