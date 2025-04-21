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
class ServicioTurnoConsulta {
    static obtenerTodos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Ejecutando consulta SQL:", sql_turno_1.SQL_TURNO.FIND_ALL);
            yield dbConnection_1.default
                .any(sql_turno_1.SQL_TURNO.FIND_ALL)
                .then((misDatos) => {
                console.log("Datos obtenidos:", misDatos);
                res.status(200).json(misDatos);
            })
                .catch((miError) => {
                console.log("Error en la consulta:", miError);
                res.status(400).json({ respuesta: "Se totió el SQL mano" });
            });
        });
    }
}
exports.default = ServicioTurnoConsulta;
