"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceFunctionalityGet_1 = __importDefault(require("../services/ServiceFunctionalityGet"));
class ControllerFunctionalityGet extends ServiceFunctionalityGet_1.default {
    getAll(req, res) {
        ServiceFunctionalityGet_1.default.getAll(res);
    }
}
const controllerFunctionalityGet = new ControllerFunctionalityGet();
exports.default = controllerFunctionalityGet;
