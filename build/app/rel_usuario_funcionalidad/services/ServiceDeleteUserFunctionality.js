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
const sql_RelUserFunctionality_1 = require("../repository/sql_RelUserFunctionality");
class ServiceDeleteRelUserFunctionality {
    static delete(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.task((task) => __awaiter(this, void 0, void 0, function* () {
                const result = yield task.none(sql_RelUserFunctionality_1.sqlRelUserFunctionality.delete, obj);
                return { result };
            })).then(({ result }) => {
                res.status(200).json({
                    respuesta: "Relación usuario funcionalidad eliminada correctamente",
                    detalle: result
                });
            }).catch((error) => {
                console.log(error);
                res.status(500).json({
                    respuesta: "Error al eliminar la relación usuario funcionalidad",
                    detalle: error.message
                });
            });
        });
    }
}
exports.default = ServiceDeleteRelUserFunctionality;
