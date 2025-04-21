"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceFunctonalityCreate_1 = __importDefault(require("../services/ServiceFunctonalityCreate"));
const Functionality_1 = __importDefault(require("../model/Functionality"));
class ControllerFunctionalityCreate extends ServiceFunctonalityCreate_1.default {
    create(req, res) {
        const obj = new Functionality_1.default(0, req.body.codPadreFuncionalidad, req.body.nombreFuncionalidad, req.body.urlFuncionalidad);
        ServiceFunctonalityCreate_1.default.create(obj, res);
    }
}
const controllerFunctionalityCreate = new ControllerFunctionalityCreate();
exports.default = controllerFunctionalityCreate;
