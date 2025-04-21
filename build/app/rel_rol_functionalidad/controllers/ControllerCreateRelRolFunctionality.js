"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rel_rol_funcionalidad_1 = __importDefault(require("../model/Rel_rol_funcionalidad"));
const ServiceCreateRelRolFunctionality_1 = __importDefault(require("../services/ServiceCreateRelRolFunctionality"));
class ControllerCreateRelRolFunctionality extends ServiceCreateRelRolFunctionality_1.default {
    create(req, res) {
        const obj = new Rel_rol_funcionalidad_1.default(req.body.codRol, req.body.codFunctionality);
        ServiceCreateRelRolFunctionality_1.default.create(obj, res);
    }
}
const controllerCreateRelRolFunctionality = new ControllerCreateRelRolFunctionality();
exports.default = controllerCreateRelRolFunctionality;
