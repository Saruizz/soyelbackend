"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceDeleteRelRolFunctionality_1 = __importDefault(require("../services/ServiceDeleteRelRolFunctionality"));
const Rel_rol_funcionalidad_1 = __importDefault(require("../model/Rel_rol_funcionalidad"));
class ControllerDeleteRelRolFunctionality extends ServiceDeleteRelRolFunctionality_1.default {
    delete(req, res) {
        const obj = new Rel_rol_funcionalidad_1.default(Number(req.params.cod_rol), Number(req.params.cod_funcionalidad));
        ServiceDeleteRelRolFunctionality_1.default.delete(obj, res);
    }
}
const controllerDeleteRelRolFunctionality = new ControllerDeleteRelRolFunctionality();
exports.default = controllerDeleteRelRolFunctionality;
