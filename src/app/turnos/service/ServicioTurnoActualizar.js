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
    return (mod && mod.__esModule) ? { "default": mod } : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
const sql_turno_1 = require("../repository/sql_turno");

class ServicioTurnoActualizar {
    static actualizarTurno(objTurno, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                    let caso = 1;
                    let objActualizado = null;

                    // Verificar si el turno existe antes de actualizar
                    const turnoExistente = yield consulta.oneOrNone(sql_turno_1.SQL_TURNO.FIND_BY_ID, [objTurno.codTurno]);

                    if (turnoExistente) {
                        caso = 2;
                        objActualizado = yield consulta.result(sql_turno_1.SQL_TURNO.UPDATE, [
                            objTurno.codParqueadero,
                            objTurno.descripcionTurno,
                            objTurno.fechaTurno,
                            objTurno.horaInicioTurno,
                            objTurno.horaFinTurno,
                            objTurno.codTurno
                        ]);
                    }

                    return { caso, objActualizado };
                }))
                    .then(({ caso, objActualizado }) => {
                        if (caso === 1) {
                            res.status(400).json({ respuesta: "El turno no existe" });
                        } else {
                            res.status(200).json({ respuesta: "Turno actualizado correctamente", detalle: objActualizado.rowCount });
                        }
                    })
                    .catch((miError) => {
                        console.error(miError);
                        res.status(400).json({ respuesta: "Error al actualizar turno" });
                    });
            } catch (error) {
                console.error(error);
                res.status(500).json({ respuesta: "Error en el servidor" });
            }
        });
    }
}

exports.default = ServicioTurnoActualizar;