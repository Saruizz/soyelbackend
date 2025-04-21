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
            try {
                console.log("📩 Datos recibidos para grabar:", obj);
                console.log("📆 Fecha Turno:", obj.fecha_Turno);
                console.log("⏰ Hora Inicio:", obj.hora_Inicio_Turno);
                console.log("⏰ Hora Fin:", obj.hora_Fin_Turno);
                const resultado = yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                    let caso = 1;
                    let objGrabado = null;
                    console.log("🔍 Verificando existencia de turno con:");
                    console.log("   📆 Fecha:", obj.fecha_Turno);
                    console.log("   ⏰ Hora Inicio:", obj.hora_Inicio_Turno);
                    console.log("   ⏰ Hora Fin:", obj.hora_Fin_Turno);
                    const turnos = yield consulta.oneOrNone(sql_turno_1.SQL_TURNO.HOW_MANY, [
                        obj.fecha_Turno,
                        obj.hora_Inicio_Turno,
                        obj.hora_Fin_Turno,
                    ]);
                    console.log("📊 Resultado de consulta turnos:", turnos);
                    if (!turnos || turnos.cantidad == 0) {
                        console.log("✅ No hay turnos existentes, creando nuevo turno con:");
                        console.log("   🏢 Parqueadero:", obj.cod_Parqueadero);
                        console.log("   📜 Descripción:", obj.descripcion_Turno);
                        console.log("   📆 Fecha:", obj.fecha_Turno);
                        console.log("   ⏰ Hora Inicio:", obj.hora_Inicio_Turno);
                        console.log("   ⏰ Hora Fin:", obj.hora_Fin_Turno);
                        caso = 2;
                        objGrabado = yield consulta.one(sql_turno_1.SQL_TURNO.ADD, [
                            obj.cod_Parqueadero,
                            obj.descripcion_Turno,
                            obj.fecha_Turno,
                            obj.hora_Inicio_Turno,
                            obj.hora_Fin_Turno,
                        ]);
                        console.log("🔍 Objeto grabado en BD:", objGrabado);
                    }
                    return { caso, objGrabado };
                }));
                console.log("🎯 Resultado final antes de enviar respuesta:", resultado);
                if (!resultado) {
                    console.error("⛔ ERROR: El resultado es undefined");
                    return res.status(500).json({ respuesta: "Error interno en la creación del turno" });
                }
                if (resultado.caso === 1) {
                    return res.status(400).json({ respuesta: "El turno ya existe" });
                }
                else {
                    return res.status(200).json(resultado.objGrabado);
                }
            }
            catch (miError) {
                console.error("⛔ ERROR SQL:", miError);
                return res.status(500).json({ respuesta: "Error en la consulta SQL" });
            }
        });
    }
}
exports.default = ServicioTurnoCrear;
