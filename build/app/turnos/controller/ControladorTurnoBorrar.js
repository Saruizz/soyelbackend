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
const ServicioTurnoBorrar_1 = __importDefault(require("../service/ServicioTurnoBorrar"));
class ControladorTurnoBorrar {
    llamarBorrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo = Number(req.params.codturno);
            if (isNaN(codigo) || codigo <= 0) {
                res.status(400).json({ respuesta: "Código de turno inválido" });
                return;
            }
            yield ServicioTurnoBorrar_1.default.borrar(codigo, res); // Enviar solo el código al servicio
        });
    }
}
const controladorTurnoBorrar = new ControladorTurnoBorrar();
exports.default = controladorTurnoBorrar;
