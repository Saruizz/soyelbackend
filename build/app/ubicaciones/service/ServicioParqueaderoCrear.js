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
class ServicioParqueaderoCrear {
    static grabarParqueadero(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objGrabado;
                const parqueaderos = yield consulta.one(sql_ubicacion_1.SQL_PARQUEADERO.HOW_MANY, [obj.nombreParqueadero]);
                if (parqueaderos.cantidad == 0) {
                    caso = 2;
                    objGrabado = yield consulta.one(sql_ubicacion_1.SQL_PARQUEADERO.ADD, [obj.codUbicacion, obj.nombreParqueadero, obj.dirParqueadero, obj.telParqueadero]);
                }
                return { caso, objGrabado };
            }))
                .then(({ caso, objGrabado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Parqueadero ya existe" });
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
exports.default = ServicioParqueaderoCrear;
