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
const ServicioRelTurnoUsuario_1 = __importDefault(require("../service/ServicioRelTurnoUsuario"));
class ControladorRelTurnoUsuario {
    crearRelacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("📥 Datos recibidos en la solicitud:", req.body);
            const { cod_turno, cod_usuario } = req.body;
            if (!cod_turno || !cod_usuario) {
                res.status(400).json({ respuesta: "Faltan datos obligatorios en el cuerpo de la solicitud" });
                return;
            }
            try {
                yield ServicioRelTurnoUsuario_1.default.crearRelacion(cod_turno, cod_usuario, res);
            }
            catch (error) {
                console.error("Error al crear relación turno-usuario:", error);
                res.status(500).json({ respuesta: "Error en el servidor" });
            }
        });
    }
    eliminarRelacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codTurnoUsuario = Number(req.params.codTurnoUsuario);
            if (isNaN(codTurnoUsuario) || codTurnoUsuario <= 0) {
                res.status(400).json({ respuesta: "Código inválido" });
                return;
            }
            yield ServicioRelTurnoUsuario_1.default.eliminarRelacion(codTurnoUsuario, res);
        });
    }
    obtenerRelacionPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codTurnoUsuario = Number(req.params.codTurnoUsuario);
            if (isNaN(codTurnoUsuario) || codTurnoUsuario <= 0) {
                res.status(400).json({ respuesta: "Código inválido" });
                return;
            }
            yield ServicioRelTurnoUsuario_1.default.obtenerRelacionPorId(codTurnoUsuario, res);
        });
    }
    obtenerTodasLasRelaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ServicioRelTurnoUsuario_1.default.obtenerTodasLasRelaciones(res);
        });
    }
    actualizarRelacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codTurnoUsuario = Number(req.params.codTurnoUsuario);
            if (isNaN(codTurnoUsuario) || codTurnoUsuario <= 0) {
                res.status(400).json({ respuesta: "Código inválido" });
                return;
            }
            const { cod_turno, cod_usuario } = req.body;
            if (!cod_turno || !cod_usuario) {
                res.status(400).json({ respuesta: "Faltan datos obligatorios en el cuerpo de la solicitud" });
                return;
            }
            try {
                yield ServicioRelTurnoUsuario_1.default.actualizarRelacion(codTurnoUsuario, cod_turno, cod_usuario, res);
            }
            catch (error) {
                console.error("Error en la actualización:", error);
                res.status(500).json({ respuesta: "Error interno del servidor" });
            }
        });
    }
}
exports.default = new ControladorRelTurnoUsuario();
