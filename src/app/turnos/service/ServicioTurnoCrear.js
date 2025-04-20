"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"])(value); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? { "default": mod } : mod;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnection_1 = require ("../../../config/connection/dbConnection");
const sql_turno_1 = require("../repository/sql_turno");

class ServicioTurnoCrear {
    static grabarTurno(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("🔍 Verificando existencia de turno...");
                console.log("📌 Verificando pool:", pool);

                if (!pool || typeof dbconnection_1.task !== "function") {
                throw new Error("❌ pool no está definido o no tiene el método 'task'");
                }
                const resultado = yield pool.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                    let caso = 1;
                    let objGrabado = null;

                    const turnos = yield consulta.oneOrNone(sql_turno_1.SQL_TURNO.HOW_MANY, [
                        obj.fechaTurno,
                        obj.horaInicioTurno,
                        obj.horaFinTurno,
                    ]);

                    console.log("📊 Resultado de consulta turnos:", turnos);

                    if (!turnos || turnos.cantidad == 0) {  
                        console.log("✅ No hay turnos existentes, creando nuevo turno...");
                        caso = 2;
                        objGrabado = yield consulta.one(sql_turno_1.SQL_TURNO.ADD, [
                            obj.codParqueadero,
                            obj.descripcionTurno,
                            obj.fechaTurno,
                            obj.horaInicioTurno,
                            obj.horaFinTurno,
                        ]);
                    }

                    console.log("🔍 Objeto grabado:", objGrabado);
                    return { caso, objGrabado }; 
                }));

                console.log("🎯 Resultado final:", resultado);

                if (!resultado) {
                    console.error("⛔ ERROR: El resultado es undefined");
                    return res.status(500).json({ respuesta: "Error interno en la creación del turno" });
                }

                if (resultado.caso === 1) {
                    return res.status(400).json({ respuesta: "El turno ya existe" });
                } else {
                    return res.status(200).json(resultado.objGrabado);
                }
            } catch (miError) {
                console.error("⛔ ERROR SQL:", miError);
                return res.status(500).json({ respuesta: "Error en la consulta SQL" });
            }
        });
    }
}

exports.default = ServicioTurnoCrear;
