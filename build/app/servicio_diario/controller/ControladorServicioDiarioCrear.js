"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioDiarioCrear_1 = __importDefault(require("../service/ServicioDiarioCrear"));
class ControladorServicioDiarioCrear extends ServicioDiarioCrear_1.default {
    llamarGrabarServicioDiario(req, res) {
        ServicioDiarioCrear_1.default.grabarServicioDiario(req, res);
    }
}
const controladorServicioDiarioCrear = new ControladorServicioDiarioCrear();
exports.default = controladorServicioDiarioCrear;
