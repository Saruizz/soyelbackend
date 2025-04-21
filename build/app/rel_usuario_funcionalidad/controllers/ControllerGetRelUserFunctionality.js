"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceGetAllRelUserFunctional_1 = __importDefault(require("../services/ServiceGetAllRelUserFunctional"));
class ControllerGetRelUserFunctionality extends ServiceGetAllRelUserFunctional_1.default {
    getAllRelUserFunctionality(req, res) {
        ServiceGetAllRelUserFunctional_1.default.getAllRelUserFunctionality(res);
    }
}
const controllerGetRelUserFunctionality = new ControllerGetRelUserFunctionality();
exports.default = controllerGetRelUserFunctionality;
