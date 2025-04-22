"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("../model/Usuario"));
const ServiceUserCreate_1 = __importDefault(require("../service/ServiceUserCreate"));
class ControllerUserCreate extends ServiceUserCreate_1.default {
    createUser(req, res) {
        const objTemporal = new Usuario_1.default(0, req.body.codRol, req.body.documentoUsuario, req.body.nombresUsuario, req.body.apellidosUsuario, req.body.generoUsuario, new Date(req.body.fechaNacimientoUsuario), req.body.telefonoUsuario);
        ServiceUserCreate_1.default.grabarUsuario(objTemporal, res);
    }
}
const controllerUserCreate = new ControllerUserCreate();
exports.default = controllerUserCreate;
