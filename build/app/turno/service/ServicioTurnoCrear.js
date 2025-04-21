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
class ServicioTurnoCrear {
    static grabarTurno(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objGrabado;
                const turnos = yield consulta.one(sql_turno_1.SQL_TURNO.HOW_MANY, [obj.descripcionTurno]);
                if (turnos.cantidad == 0) {
                    caso = 2;
                    objGrabado = yield consulta.one(sql_turno_1.SQL_TURNO.ADD, [obj.codParqueadero, obj.descripcionTurno, obj.fechaTurno, obj.horaInicioTurno, obj.horaFinTurno]);
                }
                return { caso, objGrabado };
            }))
                .then(({ caso, objGrabado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Turno ya existe" });
                        break;
                    default:
                        res.status(200).json(objGrabado);
                }
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Pailas SQL" });
            });
        });
    }
}
exports.default = ServicioTurnoCrear;
