"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceCreateRelUserFunctionality_1 = __importDefault(require("../services/ServiceCreateRelUserFunctionality"));
const RelUserFunctionality_1 = __importDefault(require("../model/RelUserFunctionality"));
class ControllerCreateRelUserFunctionality extends ServiceCreateRelUserFunctionality_1.default {
    createRelUserFunctionality(req, res) {
        const obj = new RelUserFunctionality_1.default(Number(req.params.codUsuario), Number(req.params.codFuncionalidad));
        ServiceCreateRelUserFunctionality_1.default.create(obj, res);
    }
}
const controllerCreateRelUserFunctionality = new ControllerCreateRelUserFunctionality();
exports.default = controllerCreateRelUserFunctionality;
