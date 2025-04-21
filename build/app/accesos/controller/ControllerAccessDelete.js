"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Accesos_1 = __importDefault(require("../model/Accesos"));
const ServiceAccessDelete_1 = __importDefault(require("../service/ServiceAccessDelete"));
class ControllerAccessDelete extends ServiceAccessDelete_1.default {
    delete(req, res) {
        const objTemporal = new Accesos_1.default(parseInt(req.params.codUsuario), "", "", "");
        ServiceAccessDelete_1.default.deleteAccess(objTemporal, res);
    }
}
const controllerAccessDelete = new ControllerAccessDelete();
exports.default = controllerAccessDelete;
