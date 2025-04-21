"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RelUserFunctionality_1 = __importDefault(require("../model/RelUserFunctionality"));
const ServiceDeleteUserFunctionality_1 = __importDefault(require("../services/ServiceDeleteUserFunctionality"));
class ControllerDeleteRelUserFuncionality extends ServiceDeleteUserFunctionality_1.default {
    deleteRelUserFunctionality(req, res) {
        const obj = new RelUserFunctionality_1.default(Number(req.params.codUsuario), Number(req.params.codFuncionalidad));
        ServiceDeleteUserFunctionality_1.default.delete(obj, res);
    }
}
const controllerDeleteRelUserFuncionality = new ControllerDeleteRelUserFuncionality();
exports.default = controllerDeleteRelUserFuncionality;
