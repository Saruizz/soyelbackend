"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioAccesoCrear_1 = __importDefault(require("../service/ServicioAccesoCrear"));
const Accesos_1 = __importDefault(require("../model/Accesos"));
class ControllerAccesCreate extends ServicioAccesoCrear_1.default {
    create(req, res) {
        const objTemporal = new Accesos_1.default(req.body.codUsuario, req.body.correo, req.body.clave, req.body.uuid);
        ServicioAccesoCrear_1.default.crearAcceso(objTemporal, res);
    }
}
const controllerAccesCreate = new ControllerAccesCreate();
exports.default = controllerAccesCreate;
