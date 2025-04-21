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
const Turno_1 = __importDefault(require("../model/Turno"));
const ServicioTurnoCrear_1 = __importDefault(require("../service/ServicioTurnoCrear"));
console.log("📌 ServicioTurnoCrear importado:", ServicioTurnoCrear_1.default);
class ControladorTurnoCrear {
    llamarGrabarTurno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            console.log("📩 Datos recibidos: ", req.body);
            try {
                console.log("📩 Datos recibidos en el backend:", req.body);
                // Validación de datos
                if (req.body.cod_parqueadero == null || // Acepta 0 como válido
                    !((_a = req.body.descripcion_turno) === null || _a === void 0 ? void 0 : _a.trim()) ||
                    !((_b = req.body.fecha_turno) === null || _b === void 0 ? void 0 : _b.trim()) ||
                    !((_c = req.body.hora_inicio_turno) === null || _c === void 0 ? void 0 : _c.trim()) ||
                    !((_d = req.body.hora_fin_turno) === null || _d === void 0 ? void 0 : _d.trim())) {
                    console.error("⛔ ERROR: Algunos datos están vacíos", req.body);
                    res.status(400).json({ error: "Datos incompletos o vacíos." });
                }
                const objTemporal = new Turno_1.default(0, req.body.cod_parqueadero, req.body.descripcion_turno, req.body.fecha_turno, req.body.hora_inicio_turno, req.body.hora_fin_turno);
                console.log("📦 Objeto Turno creado:", objTemporal);
                // Guardar en BD
                yield ServicioTurnoCrear_1.default.grabarTurno(objTemporal, res);
            }
            catch (error) {
                console.error("⛔ ERROR:", error);
                res.status(500).json({ error: "Error interno del servidor." });
            }
        });
    }
}
const controladorTurnoCrear = new ControladorTurnoCrear();
exports.default = controladorTurnoCrear;
