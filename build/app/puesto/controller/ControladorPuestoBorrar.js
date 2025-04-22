"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioPuestoBorrar_1 = __importDefault(require("../service/ServicioPuestoBorrar"));
class ControladorPuestoBorrar extends ServicioPuestoBorrar_1.default {
    llamarBorrarPuesto(req, res) {
        ServicioPuestoBorrar_1.default.borrarPuesto(req, res);
    }
}
const controladorPuestoBorrar = new ControladorPuestoBorrar();
exports.default = controladorPuestoBorrar;
