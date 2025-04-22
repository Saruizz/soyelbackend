"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Functionality_1 = __importDefault(require("../model/Functionality"));
const ServiceFunctionalityUpdate_1 = __importDefault(require("../services/ServiceFunctionalityUpdate"));
class ControllerFunctionalityUpdate extends ServiceFunctionalityUpdate_1.default {
    update(req, res) {
        const obj = new Functionality_1.default(req.body.codFuncionalidad, req.body.codPadreFuncionalidad, req.body.nombreFuncionalidad, req.body.urlFuncionalidad);
        ServiceFunctionalityUpdate_1.default.update(obj, res);
    }
}
const controllerFunctionalityUpdate = new ControllerFunctionalityUpdate();
exports.default = controllerFunctionalityUpdate;
