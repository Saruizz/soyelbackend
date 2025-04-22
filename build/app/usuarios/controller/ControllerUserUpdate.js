"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("../model/Usuario"));
const ServiceUserUpdate_1 = __importDefault(require("../service/ServiceUserUpdate"));
class ControllerUserUpdate extends ServiceUserUpdate_1.default {
    updateUser(req, res) {
        const objTemporal = new Usuario_1.default(req.body.codUsuario, req.body.codRol, req.body.documentoUsuario, req.body.nombresUsuario, req.body.apellidosUsuario, req.body.generoUsuario, new Date(req.body.fechaNacimientoUsuario), req.body.telefonoUsuario);
        ServiceUserUpdate_1.default.updateUser(objTemporal, res);
    }
}
const controllerUserUpdate = new ControllerUserUpdate();
exports.default = controllerUserUpdate;
