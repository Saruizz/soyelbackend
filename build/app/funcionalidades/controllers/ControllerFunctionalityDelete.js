"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceFunctionalityDelete_1 = __importDefault(require("../services/ServiceFunctionalityDelete"));
class ControllerFunctionalityDelete extends ServiceFunctionalityDelete_1.default {
    delete(req, res) {
        const id = Number(req.params.codFuncionalidad);
        ServiceFunctionalityDelete_1.default.delete(id, res);
    }
}
const controllerFunctionalityDelete = new ControllerFunctionalityDelete();
exports.default = controllerFunctionalityDelete;
