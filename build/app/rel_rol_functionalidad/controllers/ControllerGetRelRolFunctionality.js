"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceGetRelRolFunctionality_1 = __importDefault(require("../services/ServiceGetRelRolFunctionality"));
class ControllerGetRelRolFunctionality extends ServiceGetRelRolFunctionality_1.default {
    getAll(req, res) {
        ServiceGetRelRolFunctionality_1.default.getAll(res);
    }
}
const controllerGetRelRolFunctionality = new ControllerGetRelRolFunctionality();
exports.default = controllerGetRelRolFunctionality;
