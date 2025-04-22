"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceAccessGet_1 = __importDefault(require("../service/ServiceAccessGet"));
class ControllerAccessGet extends ServiceAccessGet_1.default {
    getAll(req, res) {
        ServiceAccessGet_1.default.getAll(res);
    }
}
const controllerAccessGet = new ControllerAccessGet();
exports.default = controllerAccessGet;
