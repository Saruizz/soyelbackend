"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicesAccessupdate_1 = __importDefault(require("../service/ServicesAccessupdate"));
const Accesos_1 = __importDefault(require("../model/Accesos"));
class ControllerAccessUpdate extends ServicesAccessupdate_1.default {
    update(req, res) {
        const objTemporal = new Accesos_1.default(req.body.codUsuario, req.body.correo, req.body.clave, req.body.uuid);
        ServicesAccessupdate_1.default.updateAccess(objTemporal, res);
    }
}
const controllerAccessUpdate = new ControllerAccessUpdate();
exports.default = controllerAccessUpdate;
